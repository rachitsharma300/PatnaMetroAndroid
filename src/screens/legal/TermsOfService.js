import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

function TermsOfService() {
  const { t } = useTranslation();

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {t("terms.title")}
      </Text>
      
      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("terms.section1Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("terms.section1Text")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("terms.section2Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("terms.section2Text")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("terms.section3Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("terms.section3Text")}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 32, marginBottom: 16 }}>
        {t("terms.section4Title")}
      </Text>
      <Text style={{ marginBottom: 16, color: "#374151" }}>
        {t("terms.section4Text")}
      </Text>
    </ScrollView>
  );
}

export default TermsOfService;