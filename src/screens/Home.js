// screens/Home.js
import React from "react";
import { SafeAreaView, View } from "react-native";
import Hero from "../components/Hero";
import RouteFinder from "../components/RouteFinder";

function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Hero />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <RouteFinder />
      </View>
    </SafeAreaView>
  );
}

export default Home;