// src/components/RouteFinder.js
import React, { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { useTranslation } from "react-i18next";
import RouteForm from "../journey/RouteForm";
import JourneySummary from "../journey/JourneySummary";
import RouteStations from "../journey/RouteStations";
import api from "../services/api";

// Import your metro train image
const MetroTrain = require("../assets/Metro.svg"); // You'll need to convert this to PNG or use react-native-svg

const RouteFinder = forwardRef(({ source, destination }, ref) => {
  const { t } = useTranslation();
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState({
    source: source || "",
    destination: destination || "",
  });
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [journeyDetails, setJourneyDetails] = useState(null);
  const [error, setError] = useState(null);

  // Expose the triggerSearch method via ref
  useImperativeHandle(ref, () => ({
    triggerSearch: () => {
      getRoute();
    },
  }));

  // Update selected source/destination when props change
  useEffect(() => {
    setSelected({ source, destination });
  }, [source, destination]);

  // Fetch all details needed for a journey in parallel
  const fetchJourneyDetails = async () => {
    try {
      const [routeRes, timeRes, fareRes] = await Promise.all([
        api.get(`/stations/route?source=${selected.source}&destination=${selected.destination}`),
        api.get(`/estimated-time?source=${selected.source}&destination=${selected.destination}`),
        api.get(`/fare?source=${selected.source}&destination=${selected.destination}`),
      ]);

      return {
        route: routeRes.data,
        time: Math.round(timeRes.data.estimated_time_minutes),
        fare: fareRes.data,
        stationsCount: routeRes.data.length,
      };
    } catch (error) {
      console.error("Error fetching journey details:", error);
      throw error;
    }
  };

  // Get complete route and set the states
  const getRoute = async () => {
    if (!selected.source || !selected.destination) {
      setError("Please select both source and destination stations");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const details = await fetchJourneyDetails();
      setRoute(details.route);
      setJourneyDetails({
        time: details.time,
        fare: details.fare,
        stationsCount: details.stationsCount,
      });
    } catch (error) {
      setError("Failed to get route details. Please try again.");
      Alert.alert("Error", "Failed to get route details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update selected source/destination manually
  const handleSelect = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
    setJourneyDetails(null);
    setError(null);
  };

  // Swap source and destination
  const reverseRoute = () => {
    setSelected((prev) => ({
      source: prev.destination,
      destination: prev.source,
    }));
    setRoute([]);
    setJourneyDetails(null);
    setError(null);
  };

  // Load station list on component mount
  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const response = await api.get("/stations");
        setStations(response.data);
      } catch (err) {
        setError("Failed to load stations. Please try again later.");
        Alert.alert("Error", "Failed to load stations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Metro banner */}
      <View style={styles.metroBanner}>
        <Image 
          source={MetroTrain} 
          style={styles.metroImage} 
          resizeMode="contain" 
        />
      </View>

      {/* Main route card */}
      <View style={styles.routeCard}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t("routeFinder")}
          </Text>
        </View>

        {/* Error alert */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Form section */}
        <RouteForm
          stations={stations}
          selected={selected}
          loading={loading}
          onSelectChange={handleSelect}
          onFindRoute={getRoute}
          onReverseRoute={reverseRoute}
        />

        {/* Loading indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Finding your route...</Text>
          </View>
        )}

        {/* Journey summary */}
        {journeyDetails && (
          <JourneySummary
            time={journeyDetails.time}
            fare={journeyDetails.fare}
            stationsCount={journeyDetails.stationsCount}
            route={route}
          />
        )}

        {/* Station list */}
        {route.length > 0 && <RouteStations route={route} />}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  metroBanner: {
    alignItems: "center",
    marginBottom: -32,
    marginTop: 16,
  },
  metroImage: {
    width: 200,
    height: 60,
  },
  routeCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626",
  },
  errorContainer: {
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    color: "#dc2626",
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: "#6b7280",
  },
});

export default RouteFinder;