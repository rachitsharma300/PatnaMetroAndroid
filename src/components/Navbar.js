// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MetroMapModal from "./MetroMapModal";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const scrollListener = scrollY.addListener(({ value }) => {
      setScrolled(value > 10);
    });

    return () => {
      scrollY.removeListener(scrollListener);
    };
  }, []);

  const navItems = [
    { 
      name: t("home"), 
      screen: "Home", 
      icon: "subway" 
    },
    { 
      name: t("routeFinder"), 
      screen: "RouteFinder", 
      icon: "search" 
    },
    {
      name: t("metroMap"),
      action: () => {
        setShowMapModal(true);
        setMobileMenuOpen(false);
      },
      icon: "map"
    },
    { 
      name: t("fareInfo"), 
      screen: "FareInfo", 
      icon: "rupee-sign" 
    },
    { 
      name: t("about"), 
      screen: "About", 
      icon: "info-circle" 
    },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
    setMobileMenuOpen(false);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [80, 60],
    extrapolate: "clamp"
  });

  const bgColor = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: ["rgba(37, 99, 235, 1)", "rgba(30, 64, 175, 1)"],
    extrapolate: "clamp"
  });

  return (
    <>
      <Animated.View 
        style={[
          styles.navbar, 
          { 
            height: headerHeight,
            backgroundColor: bgColor
          }
        ]}
      >
        <View style={styles.navContainer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Home")} 
            style={styles.logoContainer}
          >
            <Animated.View style={styles.iconContainer}>
              <Icon name="subway" size={24} color="#fff" />
            </Animated.View>
            <Text style={styles.logoText}>Patna Metro</Text>
          </TouchableOpacity>

          <View style={styles.desktopMenu}>
            {navItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.screen ? () => navigateToScreen(item.screen) : item.action}
                style={styles.navItem}
              >
                <Icon name={item.icon} size={16} color="#fff" style={styles.navIcon} />
                <Text style={styles.navText}>{item.name}</Text>
              </TouchableOpacity>
            ))}

            <Button onPress={toggleLanguage} variant="primary" style={styles.langButton}>
              <Icon name="language" size={16} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>
                {i18n.language === "en" ? "हिंदी" : "English"}
              </Text>
            </Button>
          </View>

          <TouchableOpacity
            style={styles.mobileMenuButton}
            onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "times" : "bars"} size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Mobile Menu */}
        <Modal
          visible={mobileMenuOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <View style={styles.mobileMenuOverlay}>
            <View style={styles.mobileMenu}>
              {navItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.screen ? () => navigateToScreen(item.screen) : item.action}
                  style={styles.mobileNavItem}
                >
                  <Icon name={item.icon} size={20} color="#fff" style={styles.mobileNavIcon} />
                  <Text style={styles.mobileNavText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              
              <View style={styles.mobileMenuFooter}>
                <Button onPress={toggleLanguage} variant="primary" style={styles.mobileLangButton}>
                  <Icon name="language" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>
                    {i18n.language === "en" ? "हिंदी" : "English"}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Animated.View>

      <MetroMapModal
        visible={showMapModal}
        onClose={() => setShowMapModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  desktopMenu: {
    flexDirection: "row",
    alignItems: "center",
    display: "none", // Hidden on mobile by default
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  navIcon: {
    marginRight: 8,
  },
  navText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  langButton: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  mobileMenuButton: {
    padding: 8,
  },
  mobileMenuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
  },
  mobileMenu: {
    backgroundColor: "rgba(30, 64, 175, 0.98)",
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  mobileNavItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  mobileNavIcon: {
    marginRight: 16,
    width: 24,
  },
  mobileNavText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  mobileMenuFooter: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
  },
  mobileLangButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

// Add media queries for tablet and desktop
if (width >= 768) {
  styles.desktopMenu.display = "flex";
  styles.mobileMenuButton.display = "none";
}

export default Navbar;