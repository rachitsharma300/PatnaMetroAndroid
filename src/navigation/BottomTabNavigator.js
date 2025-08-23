import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import Home from '../screens/Home';
import RouteFinder from '../components/RouteFinder';
import MapPage from '../screens/MapPage';
import FareInfo from '../screens/FareInfo';
import About from '../screens/About';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'RouteFinder') {
            iconName = 'directions';
          } else if (route.name === 'MapPage') {
            iconName = 'map';
          } else if (route.name === 'FareInfo') {
            iconName = 'attach-money';
          } else if (route.name === 'About') {
            iconName = 'info';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ title: t('home') }}
      />
      <Tab.Screen 
        name="RouteFinder" 
        component={RouteFinder} 
        options={{ title: t('routeFinder') }}
      />
      <Tab.Screen 
        name="MapPage" 
        component={MapPage} 
        options={{ title: t('metroMap') }}
      />
      <Tab.Screen 
        name="FareInfo" 
        component={FareInfo} 
        options={{ title: t('fareInfo') }}
      />
      <Tab.Screen 
        name="About" 
        component={About} 
        options={{ title: t('about') }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;