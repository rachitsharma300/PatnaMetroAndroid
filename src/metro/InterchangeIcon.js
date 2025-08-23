import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const InterchangeIcon = ({
  size = 40,
  onPress = () => {},
  animated = true,
}) => {
  // Scale animation for press
  const scale = useSharedValue(1);
  
  // Rotation animation for continuous spin
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      rotate.value = withRepeat(
        withTiming(360, { duration: 1500 }),
        -1,
        false
      );
    }
  }, [animated]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const handlePressIn = () => {
    if (animated) {
      scale.value = withSpring(1.1);
    }
  };

  const handlePressOut = () => {
    if (animated) {
      scale.value = withSpring(1);
    }
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#fbbf24", // yellow-400 equivalent
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#d97706", // yellow-600 equivalent
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        animatedContainerStyle,
      ]}
      accessible={true}
      accessibilityLabel="Interchange"
      accessibilityRole="button"
    >
      {animated ? (
        <AnimatedText
          style={[
            {
              color: "#000",
              fontWeight: "bold",
              fontSize: size * 0.6,
            },
            animatedTextStyle,
          ]}
        >
          ⇄
        </AnimatedText>
      ) : (
        <Text
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: size * 0.6,
          }}
        >
          ⇄
        </Text>
      )}
    </AnimatedTouchable>
  );
};