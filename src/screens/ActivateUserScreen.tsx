import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import config from './../confic';
import { globalStyles } from '../styles';

const ActivateUserScreen: React.FC = () => {
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
        Alert.alert('Success', 'User activation email sent successfully.');
      } else {
        // If the request fails, display an error message with the error details from the API
        Alert.alert('Error', data.message || 'An error occurred while processing your request.');
      }
    } catch (error) {
      // Handle any network or other errors that might occur
      Alert.alert('Error', 'An error occurred while processing your request.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Activate User</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Email:</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
      <Button title="Activate User" onPress={handleActivateUser} />
    </View>
  );
};

export default ActivateUserScreen;
