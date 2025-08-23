import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import MetroMapModal from '../components/MetroMapModal';
import PrivacyPolicy from '../screens/legal/PrivacyPolicy';
import TermsOfService from '../screens/legal/TermsOfService';
import Sitemap from '../screens/legal/Sitemap';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
        }}
        mode="modal"
      >
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MetroMapModal"
          component={MetroMapModal}
          options={{
            presentation: 'transparentModal',
            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: true, title: 'Privacy Policy' }}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfService}
          options={{ headerShown: true, title: 'Terms of Service' }}
        />
        <Stack.Screen
          name="Sitemap"
          component={Sitemap}
          options={{ headerShown: true, title: 'Sitemap' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;