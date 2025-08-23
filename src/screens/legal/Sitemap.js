import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native"; // Replace react-router-dom

function Sitemap() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const menuItems = [
    { key: "home", route: "Home", translationKey: "nav.home" },
    { key: "routeFinder", route: "RouteFinder", translationKey: "nav.routeFinder" },
    { key: "fareInfo", route: "FareInfo", translationKey: "nav.fareInfo" },
    { key: "metroMap", route: "MapPage", translationKey: "nav.metroMap" },
    { key: "about", route: "About", translationKey: "nav.about" },
    { key: "privacy", route: "PrivacyPolicy", translationKey: "privacyPolicy.title" },
    { key: "terms", route: "TermsOfService", translationKey: "terms.title" },
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {t("nav.sitemap")}
      </Text>
      
      <Text style={{ marginBottom: 32, color: "#374151" }}>
        {t("sitemap.description")}
      </Text>

      <View style={{ marginLeft: 8 }}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => navigation.navigate(item.route)}
            style={{ marginBottom: 8 }}
          >
            <Text style={{ color: "#2563eb", fontSize: 16 }}>
              • {t(item.translationKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Sitemap;