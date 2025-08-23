import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

// Components and Pages
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import Home from './src/screens/Home';
import About from './src/screens/About';
import FareInfo from './src/screens/FareInfo';
import MapPage from './src/screens/MapPage';
import NotFound from './src/screens/NotFound';
import RouteFinder from './src/components/RouteFinder';
import PrivacyPolicy from './src/screens/legal/PrivacyPolicy';
import TermsOfService from './src/screens/legal/TermsOfService';
import Sitemap from './src/screens/legal/Sitemap';
import DisclaimerPopup from './src/components/DisclaimerPopup';
import Bot from './src/components/bot/Bot';
import MetroMapModal from './src/components/MetroMapModal';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import './src/utils/i18n';

const Stack = createStackNavigator();

function App() {
  const routeFinderRef = useRef();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleTriggerSearch = () => {
    if (routeFinderRef.current) {
      routeFinderRef.current.triggerSearch();
    }
  };

  // Create a screen component that includes the RouteFinder with props
  const RouteFinderScreen = () => (
    <RouteFinder
      ref={routeFinderRef}
      source={source}
      destination={destination}
    />
  );

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Navbar />
        <DisclaimerPopup />
        
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { marginTop: 0 } 
          }}
        >
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen 
            name="RouteFinder" 
            component={RouteFinderScreen}
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
          <Stack.Screen
            name="MetroMapModal"
            component={MetroMapModal}
            options={{
              presentation: 'transparentModal',
              cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }}
          />
          <Stack.Screen 
            name="NotFound" 
            component={NotFound}
            options={{ headerShown: true, title: 'Page Not Found' }}
          />
        </Stack.Navigator>

        <Bot
          triggerSearch={handleTriggerSearch}
          setSource={setSource}
          setDestination={setDestination}
        />
        <Footer />
      </View>
    </NavigationContainer>
  );
}

export default App;