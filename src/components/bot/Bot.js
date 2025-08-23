import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  Animated,
  Easing,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import stationsData from '../../utils/Stations.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import SendIcon from 'react-native-vector-icons/MaterialIcons';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import bodhiImage from '../../assets/bodhi.png';
import patnaMetroLogo from '../../assets/patna-metro-logo.png';

// स्टेशन synonyms की mapping
const stationAliases = new Map();
stationsData.stations.forEach((station) => {
  station.synonyms.forEach((synonym) => {
    stationAliases.set(synonym.toLowerCase(), station.name);
  });
});

const Bot = ({ setSource, setDestination, triggerSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isBotAwake, setIsBotAwake] = useState(false);
  const [recognitionError, setRecognitionError] = useState(null);

  const API_URL = 'https://patna-metro-backend-latest.onrender.com/api';

  const messagesEndRef = useRef(null);
  const navigation = useNavigation();
  const vibrateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Voice recognition setup
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // TTS setup
    Tts.setDefaultLanguage('hi-IN');
    Tts.addEventListener('tts-start', () => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', () => setIsSpeaking(false));
    Tts.addEventListener('tts-cancel', () => setIsSpeaking(false));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Tts.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetText =
        'नमस्कार, Patna Metro में आपका स्वागत है। मैं बोधि हूँ। Mic बटन दबाकर बोलें या नीचे लिखकर बताएँ, आपको कहाँ से कहाँ जाना है।';
      addBotMessage(greetText);
      speak(greetText);
    }
  }, [isOpen]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowPopup(false);
      setIsBotAwake(true);
    }, 3000);

    let interval;
    if (isBotAwake && !isOpen) {
      interval = setInterval(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
      }, 2000);
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isBotAwake, isOpen]);

  useEffect(() => {
    if (!isOpen && isBotAwake) {
      // Start vibration animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(vibrateAnim, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(vibrateAnim, {
            toValue: -1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(vibrateAnim, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      vibrateAnim.setValue(0);
    }
  }, [isBotAwake, isOpen]);

  const onSpeechStart = (e) => {
    setIsListening(true);
  };

  const onSpeechEnd = (e) => {
    setIsListening(false);
  };

  const onSpeechResults = (e) => {
    const transcript = e.value[0];
    setInputText(transcript);
    addUserMessage(transcript);
    const foundStations = findStationsInTranscript(transcript);
    processRouteRequest(foundStations);
  };

  const onSpeechError = (e) => {
    setIsListening(false);
    setRecognitionError(e.error);
    showError(
      'आवाज़ समझने में समस्या हुई। आप चाहें तो लिखकर भी स्टेशन का नाम बता सकते हैं।'
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollToEnd({ animated: true });
  };

  const handleBotClick = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
    setIsBotAwake(false);
    if (isSpeaking) {
      Tts.stop();
      setIsSpeaking(false);
    }
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'user', text }]);
  };

  const handleMicClick = async () => {
    if (isListening) {
      try {
        await Voice.stop();
        setIsListening(false);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    try {
      setRecognitionError(null);
      await Voice.start('hi-IN');
    } catch (e) {
      console.error(e);
      showError(
        'माफ़ कीजिए, आपका डिवाइस voice सपोर्ट नहीं करता। कृपया लिखकर बताएँ।'
      );
    }
  };

  const findStationsInTranscript = (transcript) => {
    let searchableTranscript = transcript.toLowerCase();
    const foundStations = [];
    const sortedAliases = new Map(
      [...stationAliases.entries()].sort((a, b) => b[0].length - a[0].length)
    );

    sortedAliases.forEach((stationName, synonym) => {
      const index = searchableTranscript.indexOf(synonym);
      if (index !== -1) {
        foundStations.push({ name: stationName, index: index });
        const placeholder = '#'.repeat(synonym.length);
        searchableTranscript =
          searchableTranscript.substring(0, index) +
          placeholder +
          searchableTranscript.substring(index + synonym.length);
      }
    });

    foundStations.sort((a, b) => a.index - b.index);
    const uniqueStationNames = [...new Set(foundStations.map((s) => s.name))];
    return uniqueStationNames;
  };

  const processRouteRequest = async (matchedStations) => {
    if (matchedStations.length >= 2) {
      const [source, destination] = matchedStations;
      try {
        const res = await axios.post(`${API_URL}/bot/voice-route`, {
          source,
          destination,
        });

        const data = res.data;
        addBotMessage(data.voiceResponse);
        speak(data.voiceResponse);

        setSource(source);
        setDestination(destination);
        navigation.navigate('RouteFinder');

        setTimeout(() => {
          if (typeof triggerSearch === 'function') {
            triggerSearch();
          }
        }, 500);
      } catch (err) {
        showError('माफ़ कीजिए, रूट निकालने में समस्या आ रही है।');
      }
    } else if (matchedStations.length === 1) {
      const singleStationText =
        'आपको ' + matchedStations[0] + ' से कहाँ जाना है?';
      addBotMessage(singleStationText);
      speak(singleStationText);
    } else {
      showError(
        'कृपया फिर से बताइए: जैसे \'पटना जंक्शन से पीएमसीएच जाना है।\''
      );
    }
    setInputText('');
  };

  const speak = (text) => {
    Tts.speak(text);
  };

  const showError = (errorText) => {
    addBotMessage(errorText);
    speak(errorText);
  };

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    addUserMessage(inputText);
    const foundStations = findStationsInTranscript(inputText);
    processRouteRequest(foundStations);
  };

  const translateX = vibrateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-2, 0, 2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.botButtonContainer}>
        {!isOpen && showPopup && (
          <View style={styles.popup}>
            <Text style={styles.popupText}>नमस्ते! मैं बोधि वॉइस असिस्टेंट हूँ</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={handleBotClick}
          style={[
            styles.botButton,
            isOpen && styles.botButtonOpen,
          ]}
        >
          <Animated.View style={{ transform: [{ translateX }] }}>
            {isOpen ? (
              <Icon name="times" size={24} color="white" />
            ) : (
              <Image
                source={require('../../assets/bodhi.png')}
                style={styles.botImage}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={handleBotClick}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <Image
                  source={require('../../assets/bodhi.png')}
                  style={styles.headerImage}
                />
                <Text style={styles.headerText}>
                  बोधि
                  {isListening && (
                    <View style={styles.listeningIndicator}>
                      <View style={[styles.indicatorDot, styles.indicatorPulse]} />
                      <View style={styles.indicatorDot} />
                    </View>
                  )}
                </Text>
              </View>
              <TouchableOpacity onPress={handleBotClick} style={styles.closeButton}>
                <Icon name="times" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.messagesContainer}
              ref={messagesEndRef}
              onContentSizeChange={scrollToBottom}
            >
              {messages.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    msg.type === 'user' ? styles.userMessage : styles.botMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <TouchableOpacity
                  onPress={handleMicClick}
                  style={[
                    styles.micButton,
                    isListening && styles.micButtonActive,
                  ]}
                >
                  <Icon
                    name={isListening ? 'times' : 'microphone'}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="यहाँ लिखें..."
                  onSubmitEditing={handleTextSubmit}
                />
                <TouchableOpacity
                  onPress={handleTextSubmit}
                  style={styles.sendButton}
                  disabled={!inputText.trim()}
                >
                  <SendIcon name="send" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.inputHint}>
                Mic बटन दबाकर बोलें या लिखकर बताएँ
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 50,
  },
  botButtonContainer: {
    position: 'relative',
  },
  popup: {
    position: 'absolute',
    bottom: 60,
    right: -195,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupText: {
    color: '#ca8a04',
    fontSize: 14,
  },
  botButton: {
    borderRadius: 50,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  botButtonOpen: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  botImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1d4ed8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listeningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  indicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    marginHorizontal: 1,
  },
  indicatorPulse: {
    opacity: 0.5,
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcfce7',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#1f2937',
    fontSize: 14,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  micButton: {
    backgroundColor: '#22c55e',
    borderRadius: 50,
    padding: 12,
    marginRight: 8,
  },
  micButtonActive: {
    backgroundColor: '#ef4444',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 50,
    padding: 12,
    marginLeft: 8,
  },
  inputHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
  },
});

export default Bot;