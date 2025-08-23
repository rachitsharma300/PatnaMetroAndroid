import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";

function JourneySummary({ time, fare, stationsCount }) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.summaryBox}>
        <Text style={styles.title}>{t("JourneySummary.title")}</Text>
        
        <View style={styles.row}>
          <View style={styles.iconTextContainer}>
            <Icon name="clock" size={16} color="#2563eb" />
            <Text style={styles.label}>{t("JourneySummary.time")}:</Text>
          </View>
          <Text style={styles.value}>
            {time} {t("JourneySummary.minutes")}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconTextContainer}>
            <Icon name="rupee-sign" size={16} color="#16a34a" />
            <Text style={styles.label}>{t("JourneySummary.fare")}:</Text>
          </View>
          <Text style={styles.value}>₹{fare}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconTextContainer}>
            <Icon name="train" size={16} color="#dc2626" />
            <Text style={styles.label}>{t("JourneySummary.stations")}:</Text>
          </View>
          <Text style={styles.value}>{stationsCount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
  },
  summaryBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#374151",
    fontWeight: "600",
  },
  value: {
    color: "#1f2937",
  },
});

export default JourneySummary;