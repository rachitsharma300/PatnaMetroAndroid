import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Linking,
} from "react-native";
import { useTranslation } from "react-i18next";
import { metroData } from "../constants/metroData";

function FareInfo() {
  const { t } = useTranslation();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("fareInfoPage.title")}</Text>
        <Text style={styles.headerSubtitle}>{t("fareInfoPage.subtitle")}</Text>
      </View>

      {/* Main Content Grid */}
      <View style={styles.grid}>
        {/* Fare Structure */}
        <View style={[styles.card, styles.blueBorder]}>
          <Text style={styles.cardTitle}>
            {t("fareInfoPage.fareStructure")}
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>
                {t("fareInfoPage.distanceRange")}
              </Text>
              <Text style={styles.tableHeaderText}>
                {t("fareInfoPage.fare")}
              </Text>
            </View>
            {metroData.fareSlabs.map((slab, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{slab.range}</Text>
                <Text style={[styles.tableCell, styles.fareText]}>
                  ₹{slab.fare}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ticket Options */}
        <View style={[styles.card, styles.greenBorder]}>
          <Text style={styles.cardTitle}>
            {t("fareInfoPage.ticketOptions")}
          </Text>
          <View style={styles.list}>
            {["smartCards", "dailyPass", "touristPass", "studentPass"].map(
              (key, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.checkmark}>✔️</Text>
                  <Text style={styles.listText}>
                    {t(`fareInfoPage.${key}`)}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Quick Facts */}
        <View style={[styles.card, styles.yellowBorder]}>
          <Text style={styles.cardTitle}>
            {t("fareInfoPage.quickFacts")}
          </Text>
          <View style={styles.facts}>
            <View style={styles.factItem}>
              <Text style={styles.factTitle}>
                {t("fareInfoPage.operatingHours")}
              </Text>
              <Text style={styles.factValue}>
                {t("fareInfoPage.operatingTime")}
              </Text>
            </View>
            <View style={styles.factItem}>
              <Text style={styles.factTitle}>
                {t("fareInfoPage.frequency")}
              </Text>
              <Text style={styles.factValue}>
                {t("fareInfoPage.frequencyDetail")}
              </Text>
            </View>
            <View style={styles.factItem}>
              <Text style={styles.factTitle}>
                {t("fareInfoPage.firstLastTrain")}
              </Text>
              <Text style={styles.factValue}>
                {t("fareInfoPage.firstTrain")}
              </Text>
              <Text style={styles.factValue}>
                {t("fareInfoPage.lastTrain")}
              </Text>
            </View>
            <View style={styles.factItem}>
              <Text style={styles.factTitle}>
                {t("fareInfoPage.contact")}
              </Text>
              <Text style={styles.factValue}>
                {t("fareInfoPage.helpline")}
              </Text>
              <Text style={styles.factValue}>
                {t("fareInfoPage.email")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Fare Calculator */}
      <View style={styles.calculatorCard}>
        <Text style={styles.calculatorTitle}>
          {t("fareInfoPage.fareCalculator")}
        </Text>
        <View style={styles.calculatorForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("fareInfoPage.fromStation")}
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fromStation}
                onValueChange={setFromStation}
                style={styles.picker}
              >
                <Picker.Item
                  label={t("fareInfoPage.selectStation")}
                  value=""
                />
                {metroData.stations.map((station, index) => (
                  <Picker.Item key={index} label={station} value={station} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("fareInfoPage.toStation")}
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={toStation}
                onValueChange={setToStation}
                style={styles.picker}
              >
                <Picker.Item
                  label={t("fareInfoPage.selectStation")}
                  value=""
                />
                {metroData.stations.map((station, index) => (
                  <Picker.Item key={index} label={station} value={station} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.calculateButton}>
            <Text style={styles.calculateButtonText}>
              {t("fareInfoPage.calculateFare")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Important Notice */}
      <View style={styles.notice}>
        <Text style={styles.noticeIcon}>⚠️</Text>
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>
            {t("fareInfoPage.importantNotice")}
          </Text>
          <Text style={styles.noticeText}>
            {t("fareInfoPage.noticeDetails")}
            {new Date().toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#3b82f6",
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#dbeafe",
    fontSize: 16,
  },
  grid: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blueBorder: {
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  greenBorder: {
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  yellowBorder: {
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  table: {
    gap: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 6,
  },
  tableHeaderText: {
    fontWeight: "600",
    color: "#374151",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableCell: {
    color: "#374151",
  },
  fareText: {
    fontWeight: "600",
    color: "#3b82f6",
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkmark: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: 4,
    borderRadius: 12,
  },
  listText: {
    color: "#374151",
    flex: 1,
  },
  facts: {
    gap: 16,
  },
  factItem: {
    gap: 4,
  },
  factTitle: {
    fontWeight: "600",
    color: "#374151",
  },
  factValue: {
    color: "#6b7280",
  },
  calculatorCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  calculatorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  calculatorForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontWeight: "600",
    color: "#374151",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
  },
  picker: {
    height: 48,
  },
  calculateButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  notice: {
    backgroundColor: "#fef3c7",
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  noticeIcon: {
    fontSize: 20,
  },
  noticeContent: {
    flex: 1,
    gap: 4,
  },
  noticeTitle: {
    fontWeight: "600",
    color: "#92400e",
  },
  noticeText: {
    color: "#92400e",
    fontSize: 14,
  },
});

export default FareInfo;