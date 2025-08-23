import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withRepeat,
} from "react-native-reanimated";

const StationTrack = () => {
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withRepeat(
      withTiming(40, { duration: 2500 }), // Adjust based on container height
      -1, // Infinite repetition
      true // Reverse direction
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 4,
        height: 40,
        position: "relative",
      }}
    >
      <View
        style={{
          width: 2,
          backgroundColor: "#9ca3af",
          height: "100%",
          borderRadius: 1,
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: "#4b5563", fontSize: 14 }}>🚇</Text>
      </Animated.View>
    </View>
  );
};

export default StationTrack;