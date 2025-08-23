// src/components/Hero.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  useWindowDimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import your images - you'll need to add these to your React Native project
// For now using placeholder images
const placeholderImage = require("../assets/placeholder.png");

const Hero = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  // Placeholder images array
  const metroImages = [placeholderImage, placeholderImage, placeholderImage];

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === metroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Fade animation for text
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.hero}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentRow}>
          {/* Left Section - Image */}
          <View style={styles.imageContainer}>
            <Image
              source={metroImages[currentImageIndex]}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Right Section - Content */}
          <View style={styles.contentContainer}>
            {/* Title with images */}
            <View style={styles.titleSection}>
              <Image
                source={require("../assets/placeholder.png")} // Replace with PM image
                style={styles.leaderImage}
              />
              
              <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.title}>
                  {t("hero.title")}
                </Text>
                <View style={styles.metroRouteContainer}>
                  <Image
                    source={require("../assets/placeholder.png")} // Replace with MetroSVG
                    style={styles.metroRoute}
                    resizeMode="contain"
                  />
                </View>
              </Animated.View>
              
              <Image
                source={require("../assets/placeholder.png")} // Replace with CM image
                style={styles.leaderImage}
              />
            </View>

            {/* Description */}
            <Animated.View 
              style={[styles.descriptionContainer, { opacity: fadeAnim }]}
            >
              <Text style={styles.description}>
                {t("hero.description")}
              </Text>
            </Animated.View>

            {/* Navigation Buttons */}
            <Animated.View 
              style={[styles.buttonsContainer, { opacity: fadeAnim }]}
            >
              <View style={styles.buttonsGrid}>
                <TouchableOpacity
                  onPress={() => navigateToScreen("Home")}
                  style={[styles.navButton, styles.blueButton]}
                >
                  <Icon name="subway" size={16} color="#fff" />
                  <Text style={styles.buttonText}>{t("nav.home")}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => navigateToScreen("RouteFinder")}
                  style={[styles.navButton, styles.greenButton]}
                >
                  <Icon name="search" size={16} color="#fff" />
                  <Text style={styles.buttonText}>{t("nav.routeFinder")}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => navigateToScreen("MetroMap")}
                  style={[styles.navButton, styles.purpleButton]}
                >
                  <Icon name="map" size={16} color="#fff" />
                  <Text style={styles.buttonText}>{t("nav.metroMap")}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => navigateToScreen("FareInfo")}
                  style={[styles.navButton, styles.redButton]}
                >
                  <Icon name="rupee-sign" size={16} color="#fff" />
                  <Text style={styles.buttonText}>{t("nav.fareInfo")}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => navigateToScreen("About")}
                  style={[styles.navButton, styles.yellowButton]}
                >
                  <Icon name="info-circle" size={16} color="#fff" />
                  <Text style={styles.buttonText}>{t("nav.about")}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={changeLanguage}
                  style={[styles.navButton, styles.pinkButton]}
                >
                  <Icon name="language" size={16} color="#fff" />
                  <Text style={styles.buttonText}>
                    {i18n.language === "en" ? "हिन्दी" : "English"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </View>

        {/* News Ticker */}
        <View style={styles.tickerContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <Text style={styles.tickerText}>
              {t("hero.ticker")}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    backgroundColor: "#1e3a8a",
  },
  container: {
    flexGrow: 1,
  },
  contentRow: {
    flexDirection: "column",
  },
  imageContainer: {
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 16,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  leaderImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  metroRouteContainer: {
    alignItems: "center",
  },
  metroRoute: {
    width: 200,
    height: 40,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "#bfdbfe",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    marginBottom: 24,
  },
  buttonsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
    minWidth: 120,
    justifyContent: "center",
  },
  blueButton: {
    backgroundColor: "#2563eb",
  },
  greenButton: {
    backgroundColor: "#16a34a",
  },
  purpleButton: {
    backgroundColor: "#9333ea",
  },
  redButton: {
    backgroundColor: "#dc2626",
  },
  yellowButton: {
    backgroundColor: "#ca8a04",
  },
  pinkButton: {
    backgroundColor: "#db2777",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  tickerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tickerText: {
    color: "#fbbf24",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default Hero;