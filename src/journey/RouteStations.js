import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import StationCard from "../components/StationCard";
import StationTrack from "../components/StationTrack";
import InterchangeIcon from "../metro/InterchangeIcon";

const RouteStations = ({ route }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Journey Route</Text>

      <ScrollView style={styles.stationsList}>
        {route.map((station, index) => {
          const nextStation = route[index + 1];
          const isInterchange =
            nextStation && station.line !== nextStation.line;

          return (
            <View key={station.id || index} style={styles.stationItem}>
              <StationCard
                station={{
                  ...station,
                  name: t(`stations.${station.name}`, station.name),
                }}
              />

              {isInterchange && (
                <View style={styles.interchangeContainer}>
                  <InterchangeIcon animated={false} />
                  <Text style={styles.interchangeText}>
                    Interchange to {nextStation.line}
                  </Text>
                </View>
              )}

              {index < route.length - 1 && <StationTrack />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 24,
  },
  stationsList: {
    gap: 16,
  },
  stationItem: {
    alignItems: "center",
    marginBottom: 16,
  },
  interchangeContainer: {
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  interchangeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ca8a04",
  },
});

export default RouteStations;