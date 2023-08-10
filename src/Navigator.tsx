import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import ActivateUserScreen from './screens/ActivateUserScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import UserAddScreen from './screens/UserAddScreen';
import UserListScreen from './screens/UserListScreen';
import EditPopupScreen from './screens/EditPopupScreen'
import UserAddScreenLite from './screens/UserAddScreenLite';
import UserListScreenLite from './screens/UserListScreenLite';

export type RootStackParamList = {
  Login: undefined;
  Home: { name: string };
  AdminScreen: { accessToken: string }; // Pass accessToken as a parameter
  ActivateUser: undefined;
  ForgetPassword: undefined;
  UserAddScreen: { accessToken: string };
  UserListScreen: { accessToken: string };
  EditPopupScreen: { userId: number; accessToken: string }; 
  UserAddScreenLite: { accessToken: string };
  UserListScreenLite: { accessToken: string };
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
          options={({ route }) => ({
            title: t('homeScreen.welcomeMessage', { name: route.params.name }),
          })}
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
        <Stack.Screen
          name="UserAddScreen"
          component={UserAddScreen}
          options={{ title: t('userAddScreen.title') }}
        />
      <Stack.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{ title: 'User List' }}
      />
      <Stack.Screen
        name="EditPopupScreen"
        component={EditPopupScreen}
        options={{ title: 'Edit User' }}
      />
      <Stack.Screen
          name="UserAddScreenLite"
          component={UserAddScreenLite}
          options={{ title: t('userAddScreenLite.title') }}
        />
      <Stack.Screen
        name="UserListScreenLite"
        component={UserListScreenLite}
        options={{ title: 'User List Lite' }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
