// screens/MapPage.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  Linking,
  Alert,
  StyleSheet
} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // or react-native-vector-icons/FontAwesome
import * as FileSystem from 'expo-file-system'; // For more advanced file handling if needed
import * as MediaLibrary from 'expo-media-library'; // To save to device gallery

const MapPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width, height } = useWindowDimensions();
  const metroMapImage = require('../assets/PatnaMap.webp'); // Use require for local assets

  const handleDownload = async () => {
    // For a web image (if you were using a URI), you would download it first.
    // For a local asset, we can't "download" it, so we inform the user.
    Alert.alert(
      "Image Saved",
      "The Patna Metro map is part of the app. You can find it in your device's gallery if you have previously saved it, or take a screenshot.",
      [{ text: "OK" }]
    );
    // Optional: Add functionality to save the image to the user's photos
    // This requires requesting permissions and using expo-media-library
  };

  // Fullscreen is less of a discrete mode in native apps.
  // You might implement this by navigating to a dedicated fullscreen screen
  // or using a modal. Toggling the device's fullscreen is not standard.
  const toggleFullscreen = () => {
    Alert.alert("Fullscreen", "Use your device's screen rotation for a larger view.");
    // Implement a more robust fullscreen view if needed, perhaps using a Modal component.
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patna Metro Map</Text>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable
          style={styles.iconButton}
          onPress={handleDownload}
          accessibilityLabel="Download"
        >
          <FontAwesome name="download" size={24} color="white" />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={toggleFullscreen}
          accessibilityLabel={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          <FontAwesome name={isFullscreen ? "compress" : "expand"} size={24} color="white" />
        </Pressable>
      </View>

      {/* Map */}
      <View style={styles.imageContainer}>
        <Image
          source={metroMapImage}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel="Patna Metro Map"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from 'center' to allow scrolling if needed
    padding: 16,
    backgroundColor: '#f9fafb', // bg-gray-50
  },
  title: {
    fontSize: 24, // text-3xl
    fontWeight: 'bold',
    marginBottom: 24, // mb-6
  },
  controls: {
    flexDirection: 'row',
    marginBottom: 16, // mb-4
    gap: 16, // space-x-4 equivalent
  },
  iconButton: {
    backgroundColor: '#2563eb', // bg-blue-600
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
  },
  imageContainer: {
    backgroundColor: '#f3f4f6', // bg-gray-100
    borderRadius: 8, // rounded-lg
    padding: 8, // p-2
    borderWidth: 1,
    borderColor: '#d1d5db', // border-gray-300
    shadowColor: '#000', // shadow-lg
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // max-w-4xl w-full
    flex: 1, // Allow the container to grow
  },
  image: {
    width: '100%',
    height: '100%', // Use flex in parent to control height
    borderRadius: 8, // rounded-lg
  },
});

export default MapPage;