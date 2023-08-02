import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import ActivateUserScreen from './screens/ActivateUserScreen'; // Import the ActivateUserScreen component
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'; // Import the ForgetPasswordScreen component
import config from './confic';

export type RootStackParamList = {
  Login: undefined;
  Home: { name: string };
  AdminScreen: undefined;
  ActivateUser: undefined;
  ForgetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="ActivateUser" component={ActivateUserScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
