import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FaTrain } from "react-icons/fa"; // Note: You will need react-native-vector-icons

// Create an animated touchable component
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function StationCard({ station, onPress }) {
  const isRedLine = station.line === "Red Line";
  const bgGradient = isRedLine ? "#dc2626" : "#2563eb"; // Simplified to solid colors
  const textColor = isRedLine ? "#dc2626" : "#2563eb";

  // Animation config
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  const handlePressIn = () => {
    animatedStyle.value = {
      transform: [{ scale: withTiming(1.03, { duration: 150 }) }],
    };
  };

  const handlePressOut = () => {
    animatedStyle.value = {
      transform: [{ scale: withTiming(1, { duration: 150 }) }],
    };
  };

  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
          borderRadius: 12,
          backgroundColor: bgGradient,
          marginVertical: 4,
          width: "100%",
          maxWidth: 400,
        },
        animatedStyle,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 2,
          }}
        >
          {/* Replace with react-native-vector-icons setup */}
          <Text style={{ color: textColor, fontSize: 16 }}>🚇</Text>
        </View>
        <View>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {station.name}
          </Text>
          {station.code && (
            <Text style={{ color: "white", opacity: 0.8, fontSize: 12 }}>
              {station.code}
            </Text>
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>{station.line}</Text>
        </View>
        <Text style={{ color: "white", opacity: 0.7 }}>→</Text>
      </View>
    </AnimatedTouchable>
  );
}

export default StationCard;