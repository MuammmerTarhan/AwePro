import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import ActivateUserScreen from './screens/ActivateUserScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: { name: string };
  AdminScreen: { accessToken: string }; // Pass accessToken as a parameter
  ActivateUser: undefined;
  ForgetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  const { t } = useTranslation(); // Get the t function for translations

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: t('loginScreen.title') }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({ title: t('homeScreen.welcomeMessage', { name: route.params.name }) })}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{ title: t('adminScreen.title') }}
        />
        <Stack.Screen
          name="ActivateUser"
          component={ActivateUserScreen}
          options={{ title: t('activateUserScreen.title') }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={{ title: t('loginScreen.forgetPasswordButton') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
