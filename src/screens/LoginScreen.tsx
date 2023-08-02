import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { makeRequest } from './../api';
import { globalStyles } from '../styles';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await makeRequest('post', '/auth/login', {
        email: email,
        password: password,
      });

      const { accessToken, user } = response.data;
      console.log('User Data:', user);
      console.log('Access Token:', accessToken);

      // Set the access token in the state
      setAccessToken(accessToken);

      if (user.role.name === 'Admin') {
        navigation.navigate('AdminScreen', { accessToken }); // Pass the accessToken to the AdminScreen
      } else {
        navigation.navigate('Home', { name: user.name });
      }

      Alert.alert('Success', 'Login successful!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleActivateUser = () => {
    navigation.navigate('ActivateUser');
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Welcome to Delta</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Email:</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Password:</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={globalStyles.buttonsContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={globalStyles.buttonsContainer}>
        <Button title="Activate User" onPress={handleActivateUser} />
        <Button title="Forget Password" onPress={handleForgetPassword} />
      </View>
    </View>
  );
};


export default LoginScreen;
