import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {t("privacyPolicy.title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("privacyPolicy.intro")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("privacyPolicy.section1Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("privacyPolicy.section1Text")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("privacyPolicy.section2Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("privacyPolicy.section2Text")}
      </Text>
      <View style={{ marginLeft: 16, marginBottom: 16 }}>
        <Text style={{ color: "#374151", marginBottom: 8 }}>• {t("privacyPolicy.section2List1")}</Text>
        <Text style={{ color: "#374151", marginBottom: 8 }}>• {t("privacyPolicy.section2List2")}</Text>
        <Text style={{ color: "#374151", marginBottom: 8 }}>• {t("privacyPolicy.section2List3")}</Text>
      </View>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("privacyPolicy.section2Text2")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("privacyPolicy.section3Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("privacyPolicy.section3Text")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("privacyPolicy.section4Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("privacyPolicy.section4Text")}
      </Text>
    </ScrollView>
  );
}

export default PrivacyPolicy;