import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import config from './../confic';
import { globalStyles } from '../styles';

const ActivateUserScreen: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleActivateUser = async () => {
    try {
      // Make a POST request to the backend API to activate the user
      const response = await fetch(`${config.backendURL}/auth/activateAccount`, {
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
        Alert.alert(t('activateUserScreen.successTitle'), t('activateUserScreen.successMessage'));
      } else {
        // If the request fails, display an error message with the error details from the API
        Alert.alert(t('activateUserScreen.errorTitle'), data.message || t('activateUserScreen.errorMessage'));
      }
    } catch (error) {
      // Handle any network or other errors that might occur
      Alert.alert(t('activateUserScreen.errorTitle'), t('activateUserScreen.networkErrorMessage'));
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{t('activateUserScreen.title')}</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('activateUserScreen.email')}</Text>
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
      <Button title={t('activateUserScreen.activateButton')} onPress={handleActivateUser} />
    </View>
  );
};

export default ActivateUserScreen;
