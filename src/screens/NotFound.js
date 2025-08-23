// screens/NotFound.js
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function NotFound() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>404 - Page Not Found</Text>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text style={{ color: '#2563eb' }}>Go Home</Text> 
        {/* text-blue-600 */}
      </Pressable>
    </View>
  );
}

export default NotFound;