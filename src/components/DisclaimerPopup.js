// src/components/DisclaimerPopup.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";

function DisclaimerPopup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000); // auto close after 10 sec
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShow(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Disclaimer</Text>
          <ScrollView style={styles.content}>
            <Text style={styles.text}>
              This website currently displays demo data for informational and
              testing purposes only. Patna Metro has not yet officially released the
              complete details. Actual fares, timings, and route information may
              vary. <Text style={styles.bold}>Once the official data is published, this website will be
              updated accordingly.</Text>
            </Text>
            
            <Text style={styles.title}>अस्वीकरण</Text>
            <Text style={styles.text}>
              यह वेबसाइट वर्तमान में केवल डेमो डेटा दिखा रही है, जिसका उपयोग जानकारी
              और टेस्टिंग के लिए किया जा रहा है। पटना मेट्रो ने अभी तक आधिकारिक
              जानकारी साझा नहीं की है। वास्तविक किराया, समय और रूट जानकारी अलग हो
              सकती है। <Text style={styles.bold}>जैसे ही आधिकारिक डेटा जारी होगा, यह वेबसाइट अपडेट कर दी
              जाएगी।</Text>
            </Text>
          </ScrollView>
          
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    maxWidth: 400,
    width: "100%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  content: {
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default DisclaimerPopup;