// src/components/MetroMapModal.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const { width, height } = Dimensions.get("window");

const MetroMapModal = ({ visible, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Using a placeholder image - replace with your actual metro map image
  const metroMapImage = require("../assets/PatnaMap.webp");

  const handleDownload = async () => {
    try {
      // For React Native, we need to use a different approach for downloads
      if (Platform.OS === 'web') {
        // Web implementation
        const link = document.createElement("a");
        link.href = metroMapImage;
        link.download = "Patna-Metro-Map.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile implementation
        const { status } = await MediaLibrary.requestPermissionsAsync();
        
        if (status === 'granted') {
          const asset = await MediaLibrary.createAssetAsync(metroMapImage);
          await MediaLibrary.createAlbumAsync('Downloads', asset, false);
          Alert.alert('Success', 'Map downloaded to your gallery!');
        } else {
          Alert.alert('Permission required', 'Please allow access to save the map');
        }
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert('Error', 'Failed to download the map');
    }
  };

  const shareImage = async () => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(metroMapImage);
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
          {/* Header with controls */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Patna Metro Map</Text>
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleDownload}
                accessibilityLabel="Download"
              >
                <Icon name="download" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={shareImage}
                accessibilityLabel="Share"
              >
                <Icon name="share" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={onClose}
                accessibilityLabel="Close"
              >
                <Icon name="times" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Map Container */}
          <View style={styles.imageContainer}>
            <Image
              source={metroMapImage}
              style={styles.image}
              resizeMode="contain"
              onError={() => console.log("Error loading image")}
            />
          </View>

          {/* Footer with legend */}
          <View style={styles.footer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: "#3b82f6" }]} />
                  <Text style={styles.legendText}>Blue Line</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: "#ef4444" }]} />
                  <Text style={styles.legendText}>Red Line</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { 
                    backgroundColor: "#9ca3af", 
                    borderWidth: 2, 
                    borderColor: "black" 
                  }]} />
                  <Text style={styles.legendText}>Elevated Interchange</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { 
                    backgroundColor: "transparent", 
                    borderWidth: 2, 
                    borderColor: "black" 
                  }]} />
                  <Text style={styles.legendText}>Underground Interchange</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { 
                    backgroundColor: "#84cc16", 
                    borderRadius: 10 
                  }]} />
                  <Text style={styles.legendText}>Depot</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    maxWidth: 800,
    maxHeight: "90%",
  },
  fullscreenContainer: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  controls: {
    flexDirection: "row",
    gap: 16,
  },
  controlButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  imageContainer: {
    height: 400,
    backgroundColor: "#f3f4f6",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  footer: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  legendContainer: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
  },
  legendText: {
    fontSize: 12,
    color: "#374151",
  },
});

export default MetroMapModal;