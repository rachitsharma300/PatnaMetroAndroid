// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // bg-gray-100
  },
  // Add other global styles as needed
});

// You can also define your color palette here
export const colors = {
  primary: '#your-primary-color',
  // ... other colors from your Tailwind config
};