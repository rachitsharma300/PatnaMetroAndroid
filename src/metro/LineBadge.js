import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LineBadge = ({ line }) => {
  const lineStyles = {
    "Blue Line": {
      backgroundColor: "#2563eb", // blue-600
      color: "#ffffff",
    },
    "Red Line": {
      backgroundColor: "#dc2626", // red-600
      color: "#ffffff",
    },
  };

  const style = lineStyles[line] || {
    backgroundColor: "#4b5563", // gray-600
    color: "#ffffff",
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: style.backgroundColor },
      ]}
    >
      <Text style={[styles.text, { color: style.color }]}>
        {line}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});