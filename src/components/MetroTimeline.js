// src/components/MetroTimeline.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const MetroTimeline = () => {
  const events = [
    {
      date: "2014",
      title: "Concept Proposed",
      description: "Initial proposal for Patna Metro submitted to central government",
    },
    {
      date: "2016",
      title: "Feasibility Study",
      description: "Detailed project report prepared by RITES",
    },
    {
      date: "Feb 2018",
      title: "Approval Granted",
      description: "Union Cabinet approves Patna Metro project",
    },
    {
      date: "Feb 2019",
      title: "Foundation Laid",
      description: "PM Modi lays foundation stone for the project",
    },
    {
      date: "2021",
      title: "Construction Begins",
      description: "Actual construction work starts on priority corridors",
    },
    {
      date: "2024 (Expected)",
      title: "First Trial Run",
      description: "Expected trial run on completed sections",
    },
    {
      date: "2026 (Expected)",
      title: "Full Operation",
      description: "Expected completion of Phase 1",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.timelineLine} />
      {events.map((event, index) => (
        <View
          key={index}
          style={[
            styles.eventContainer,
            index % 2 === 0 ? styles.eventRight : styles.eventLeft,
          ]}
        >
          <View
            style={[
              styles.eventDot,
              index % 2 === 0 ? styles.eventDotRight : styles.eventDotLeft,
            ]}
          />
          <View
            style={[
              styles.eventContent,
              index % 2 === 0 ? styles.eventContentRight : styles.eventContentLeft,
              index % 2 === 0 ? styles.bgBlue50 : styles.bgWhite,
            ]}
          >
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  timelineLine: {
    position: "absolute",
    left: "50%",
    width: 2,
    backgroundColor: "#dbeafe",
    height: "100%",
    marginLeft: -1,
  },
  eventContainer: {
    marginBottom: 32,
    position: "relative",
  },
  eventRight: {
    paddingRight: "50%",
    paddingLeft: 16,
  },
  eventLeft: {
    paddingLeft: "50%",
    paddingRight: 16,
  },
  eventDot: {
    position: "absolute",
    top: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2563eb",
  },
  eventDotRight: {
    right: -8,
  },
  eventDotLeft: {
    left: -8,
  },
  eventContent: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventContentRight: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  eventContentLeft: {
    marginRight: "auto",
    alignItems: "flex-start",
  },
  bgBlue50: {
    backgroundColor: "#dbeafe",
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
  eventDate: {
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
    fontSize: 14,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1f2937",
  },
  eventDescription: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MetroTimeline;