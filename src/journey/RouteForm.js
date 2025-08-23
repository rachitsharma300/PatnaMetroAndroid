import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const RouteForm = ({
  stations,
  selected,
  loading,
  onSelectChange,
  onFindRoute,
  onReverseRoute,
}) => {
  const { t } = useTranslation();

  // Animation for reverse button
  const rotateY = useSharedValue(0);
  React.useEffect(() => {
    rotateY.value = withRepeat(
      withTiming(360, { duration: 6000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotateY.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Source & Destination with Reverse Button */}
      <View style={styles.stationsContainer}>
        {/* Source Station */}
        <View style={styles.stationInput}>
          <View style={styles.labelContainer}>
            <Icon name="map-marker-alt" size={16} color="#dc2626" />
            <Text style={styles.label}>
              {t("RouteFinder.sourceStation")}
            </Text>
          </View>
          <View style={styles.pickerContainer}>
            <Icon
              name="map-marker-alt"
              size={16}
              color="#6b7280"
              style={styles.pickerIcon}
            />
            <Picker
              selectedValue={selected.source}
              onValueChange={(value) => onSelectChange("source", value)}
              style={styles.picker}
            >
              <Picker.Item
                label={t("RouteFinder.selectSource")}
                value=""
              />
              {stations.map((st) => (
                <Picker.Item
                  key={st.id}
                  label={t(`stations.${st.name}`, st.name)}
                  value={st.name}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Reverse Button */}
        <AnimatedTouchable
          onPress={onReverseRoute}
          style={[styles.reverseButton, animatedStyle]}
        >
          <Icon name="exchange-alt" size={20} color="white" />
        </AnimatedTouchable>

        {/* Destination Station */}
        <View style={styles.stationInput}>
          <View style={styles.labelContainer}>
            <Icon name="flag-checkered" size={16} color="#16a34a" />
            <Text style={styles.label}>
              {t("RouteFinder.destinationStation")}
            </Text>
          </View>
          <View style={styles.pickerContainer}>
            <Icon
              name="flag-checkered"
              size={16}
              color="#6b7280"
              style={styles.pickerIcon}
            />
            <Picker
              selectedValue={selected.destination}
              onValueChange={(value) => onSelectChange("destination", value)}
              style={styles.picker}
            >
              <Picker.Item
                label={t("RouteFinder.selectDestination")}
                value=""
              />
              {stations.map((st) => (
                <Picker.Item
                  key={st.id}
                  label={t(`stations.${st.name}`, st.name)}
                  value={st.name}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {/* Find Route Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onFindRoute}
          disabled={loading}
          style={[
            styles.findButton,
            loading && styles.findButtonDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Icon name="search" size={16} color="white" />
              <Text style={styles.findButtonText}>
                {t("RouteFinder.findRoute")}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  stationsContainer: {
    flexDirection: "column",
    gap: 16,
  },
  stationInput: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    color: "#1f2937",
    fontSize: 14,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  pickerIcon: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
    height: 48,
  },
  reverseButton: {
    alignSelf: "center",
    padding: 16,
    backgroundColor: "#3b82f6",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  findButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    minWidth: 200,
    justifyContent: "center",
  },
  findButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  findButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RouteForm;