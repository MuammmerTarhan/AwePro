// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { globalStyles } from '../styles';

import config from './../confic';

// Define the type for the route.params object
type HomeScreenParams = {
  name: string;
};

// Define the custom RouteProp type
type RootStackParamList = {
  Home: HomeScreenParams;
};

const HomeScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

  const { name } = route.params;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Welcome, {name}!</Text>
      {/* ... */}
    </View>
  );
};

export default HomeScreen;
