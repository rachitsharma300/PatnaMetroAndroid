// src/components/Footer.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const currentYear = new Date().getFullYear();
  
  const metroLines = [
    { name: "Blue Line", stations: 12, length: "16.94 km", color: "#3b82f6" },
    { name: "Red Line", stations: 13, length: "14.45 km", color: "#ef4444" },
  ];

  const openExternalLink = (url) => {
    Linking.openURL(url).catch(err => 
      console.error("Failed to open URL:", err)
    );
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footer}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {/* About Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.headerIndicator} />
              <Text style={styles.sectionTitle}>
                {t("footer.aboutTitle")}
              </Text>
            </View>
            <Text style={styles.sectionDescription}>
              {t("footer.aboutDescription")}
            </Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity 
                onPress={() => openExternalLink("https://github.com/rachitsharma300")}
                style={styles.socialIcon}
              >
                <Icon name="github" size={20} color="#9ca3af" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => openExternalLink("https://x.com/rachitsharma300")}
                style={styles.socialIcon}
              >
                <Icon name="twitter" size={20} color="#9ca3af" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => openExternalLink("https://www.instagram.com/rachitsharma300/")}
                style={styles.socialIcon}
              >
                <Icon name="instagram" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("footer.quickLinksTitle")}
            </Text>
            <View style={styles.linksList}>
              <TouchableOpacity 
                onPress={() => navigateToScreen("Home")}
                style={styles.linkItem}
              >
                <Text style={styles.linkText}>
                  {t("footer.quickLinks.home")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigateToScreen("RouteFinder")}
                style={styles.linkItem}
              >
                <Text style={styles.linkText}>
                  {t("footer.quickLinks.routeFinder")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigateToScreen("FareInfo")}
                style={styles.linkItem}
              >
                <Text style={styles.linkText}>
                  {t("footer.quickLinks.fareInfo")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigateToScreen("MetroMap")}
                style={styles.linkItem}
              >
                <Text style={styles.linkText}>
                  {t("footer.quickLinks.metroMap")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Metro Lines Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("footer.metroLinesTitle")}
            </Text>
            <View style={styles.metroLines}>
              {metroLines.map((line, index) => (
                <View key={index} style={styles.lineCard}>
                  <View style={styles.lineHeader}>
                    <View 
                      style={[
                        styles.lineIndicator, 
                        { backgroundColor: line.color }
                      ]} 
                    />
                    <Text style={styles.lineName}>{line.name}</Text>
                  </View>
                  <Text style={styles.lineDetails}>
                    {line.stations} stations • {line.length}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact & Newsletter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("footer.contactUsTitle")}
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Icon name="map-marker-alt" size={16} color="#fbbf24" />
                <Text style={styles.contactText}>{t("footer.address")}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="phone" size={16} color="#fbbf24" />
                <Text style={styles.contactText}>{t("footer.phone")}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="envelope" size={16} color="#fbbf24" />
                <Text style={styles.contactText}>{t("footer.email")}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>
            {t("footer.copyright", { year: currentYear })}
          </Text>
          <View style={styles.legalLinks}>
            <TouchableOpacity 
              onPress={() => navigateToScreen("PrivacyPolicy")}
            >
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigateToScreen("TermsOfService")}
            >
              <Text style={styles.legalLink}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigateToScreen("Sitemap")}
            >
              <Text style={styles.legalLink}>Sitemap</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.credit}>
            {t("footer.developedBy")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#111827",
    paddingVertical: 24,
  },
  container: {
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: "column",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerIndicator: {
    width: 2,
    height: 24,
    backgroundColor: "#3b82f6",
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#d1d5db",
    marginBottom: 16,
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 16,
  },
  socialIcon: {
    padding: 8,
  },
  linksList: {
    gap: 12,
  },
  linkItem: {
    paddingVertical: 4,
  },
  linkText: {
    color: "#d1d5db",
    fontSize: 14,
  },
  metroLines: {
    gap: 12,
  },
  lineCard: {
    backgroundColor: "#1f2937",
    padding: 12,
    borderRadius: 8,
  },
  lineHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  lineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  lineName: {
    color: "#fff",
    fontWeight: "500",
  },
  lineDetails: {
    color: "#9ca3af",
    fontSize: 12,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactText: {
    color: "#d1d5db",
    fontSize: 14,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingTop: 16,
    alignItems: "center",
  },
  copyright: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  legalLink: {
    color: "#d1d5db",
    fontSize: 14,
  },
  credit: {
    color: "#6b7280",
    fontSize: 12,
  },
});

export default Footer;