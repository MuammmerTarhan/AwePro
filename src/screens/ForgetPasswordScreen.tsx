import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { globalStyles } from '../styles';
import config from './../confic';

const ForgetPasswordScreen: React.FC = () => {
  const { t } = useTranslation(); // Initialize the useTranslation hook

  const [email, setEmail] = useState('');

  const handleForgetPassword = async () => {
    try {
      // Make a POST request to the backend API to trigger the "Forgot Password" functionality
      const response = await fetch(`${config.backendURL}/auth/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the request is successful, display a success message
        Alert.alert(t('forgetPasswordScreen.successTitle'), t('forgetPasswordScreen.successMessage'));
      } else {
        // If the request fails, display an error message with the error details from the API
        Alert.alert(t('forgetPasswordScreen.errorTitle'), data.message || t('forgetPasswordScreen.defaultErrorMessage'));
      }
    } catch (error) {
      // Handle any network or other errors that might occur
      Alert.alert(t('forgetPasswordScreen.errorTitle'), t('forgetPasswordScreen.defaultErrorMessage'));
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{t('forgetPasswordScreen.title')}</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('forgetPasswordScreen.email')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder={t('')}
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
      <Button title={t('forgetPasswordScreen.resetPasswordButton')} onPress={handleForgetPassword} />
    </View>
  );
};

export default ForgetPasswordScreen;
