import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { MetroTimeline } from "../components/MetroTimeline";
import Icon from "react-native-vector-icons/FontAwesome5";

export const About = () => {
  const { t } = useTranslation();

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("aboutPage.title")}</Text>
        <Text style={styles.subtitle}>{t("aboutPage.subtitle")}</Text>
      </View>

      {/* Main Content Grid */}
      <View style={styles.grid}>
        {/* Left Column - Text Content */}
        <View style={styles.column}>
          <View style={styles.textContent}>
            <Text style={styles.sectionTitle}>
              {t("aboutPage.overviewTitle")}
            </Text>
            <Text style={styles.paragraph}>
              {t("aboutPage.overviewPara1")}
            </Text>

            <Text style={[styles.sectionTitle, styles.spacedSection]}>
              {t("aboutPage.projectBackgroundTitle")}
            </Text>
            <Text style={styles.paragraph}>
              {t("aboutPage.projectBackgroundPara1")}
            </Text>
            <Text style={styles.paragraph}>
              {t("aboutPage.projectBackgroundPara2")}
            </Text>
          </View>
        </View>

        {/* Right Column - Key Facts */}
        <View style={styles.factsContainer}>
          <Text style={styles.sectionTitle}>
            {t("aboutPage.keyFactsTitle")}
          </Text>
          
          <View style={styles.factItem}>
            <View style={styles.factIcon}>
              {/* Icon placeholder */}
            </View>
            <View>
              <Text style={styles.factTitle}>{t("aboutPage.totalLength")}</Text>
              <Text style={styles.factValue}>
                {t("aboutPage.totalLengthValue")}
              </Text>
            </View>
          </View>

          <View style={styles.factItem}>
            <View style={styles.factIcon}>
              {/* Icon placeholder */}
            </View>
            <View>
              <Text style={styles.factTitle}>{t("aboutPage.lines")}</Text>
              <Text style={styles.factValue}>
                {t("aboutPage.linesValue")}
              </Text>
            </View>
          </View>

          <View style={styles.factItem}>
            <View style={styles.factIcon}>
              {/* Icon placeholder */}
            </View>
            <View>
              <Text style={styles.factTitle}>{t("aboutPage.projectCost")}</Text>
              <Text style={styles.factValue}>
                {t("aboutPage.projectCostValue")}
              </Text>
            </View>
          </View>

          <View style={styles.factItem}>
            <View style={styles.factIcon}>
              {/* Icon placeholder */}
            </View>
            <View>
              <Text style={styles.factTitle}>
                {t("aboutPage.expectedCompletion")}
              </Text>
              <Text style={styles.factValue}>
                {t("aboutPage.expectedCompletionValue")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Network Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("aboutPage.networkDetailsTitle")}
        </Text>
        
        <View style={styles.networkGrid}>
          {/* Blue Line */}
          <View style={styles.networkCard}>
            <Text style={[styles.networkTitle, { color: "#2563eb" }]}>
              {t("aboutPage.blueLineTitle")}
            </Text>
            <View style={styles.list}>
              {t("aboutPage.blueLineDetails", { returnObjects: true }).map(
                (item, index) => (
                  <Text key={index} style={styles.listItem}>• {item}</Text>
                )
              )}
            </View>
          </View>

          {/* Red Line */}
          <View style={styles.networkCard}>
            <Text style={[styles.networkTitle, { color: "#dc2626" }]}>
              {t("aboutPage.redLineTitle")}
            </Text>
            <View style={styles.list}>
              {t("aboutPage.redLineDetails", { returnObjects: true }).map(
                (item, index) => (
                  <Text key={index} style={styles.listItem}>• {item}</Text>
                )
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("aboutPage.projectTimelineTitle")}
        </Text>
        <MetroTimeline />
      </View>

      {/* Funding Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("aboutPage.implementationFundingTitle")}
        </Text>
        <Text style={styles.paragraph}>
          {t("aboutPage.implementationFundingPara1")}
        </Text>
        <Text style={styles.paragraph}>
          {t("aboutPage.implementationFundingPara2")}
        </Text>
      </View>

      {/* Developer Section */}
      <View style={styles.developerSection}>
        <Image
          source={require("../assets/Rachit.jpg")}
          style={styles.developerImage}
          accessibilityLabel="Rachit Sharma"
        />
        <Text style={styles.developerTitle}>
          {t("aboutPage.developerTitle")}
        </Text>
        <Text style={styles.developerText}>
          <Trans i18nKey="aboutPage.developerCredit">
            This application was designed and developed by
            <Text style={styles.highlight}> Rachit Sharma </Text>
            with the aim of providing comprehensive information about the Patna Metro.
          </Trans>
        </Text>
        <Text style={styles.developerText}>
          {t("aboutPage.developerContribution")}
        </Text>
        
        <View style={styles.socialLinks}>
          <TouchableOpacity
            onPress={() => openLink("https://github.com/rachitsharma300")}
            accessibilityLabel="GitHub"
          >
            <Icon name="github" size={30} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink("https://twitter.com/rachitsharma300")}
            accessibilityLabel="Twitter"
          >
            <Icon name="twitter" size={30} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink("https://www.instagram.com/rachitsharma300")}
            accessibilityLabel="Instagram"
          >
            <Icon name="instagram" size={30} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Official Website Button */}
      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          onPress={() => openLink("https://delhimetrorail.com/")}
          style={styles.websiteButton}
        >
          {t("aboutPage.officialWebsiteButton")}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 400,
  },
  grid: {
    flexDirection: "column",
    gap: 24,
    marginBottom: 32,
  },
  column: {
    flex: 1,
  },
  textContent: {
    gap: 16,
  },
  factsContainer: {
    backgroundColor: "#dbeafe",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    gap: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  spacedSection: {
    marginTop: 32,
  },
  paragraph: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  factItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  factIcon: {
    backgroundColor: "#bfdbfe",
    padding: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  factTitle: {
    fontWeight: "600",
    color: "#1f2937",
    fontSize: 16,
  },
  factValue: {
    color: "#6b7280",
    fontSize: 14,
  },
  networkGrid: {
    flexDirection: "column",
    gap: 16,
  },
  networkCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  networkTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  list: {
    gap: 8,
  },
  listItem: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  developerSection: {
    backgroundColor: "#f3f4f6",
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    marginBottom: 32,
  },
  developerImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#3b82f6",
    marginBottom: 16,
  },
  developerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  developerText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  socialLinks: {
    flexDirection: "row",
    gap: 24,
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  websiteButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    fontSize: 18,
  },
});

export default About;