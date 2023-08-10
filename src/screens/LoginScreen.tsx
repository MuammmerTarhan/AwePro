import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { makeRequest } from './../api';
import { globalStyles } from '../styles';

interface LanguageOptionProps {
  title: string;
  onPress: () => void;
  selected: boolean;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({ title, onPress, selected }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      color={selected ? 'blue' : 'grey'}
    />
  );
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = async () => {
    try {
      // Assuming you have a way to retrieve the oneSignalId
      const oneSignalId = 'someOneSignalId'; // Replace with actual retrieval logic
  
      const response = await makeRequest('post', `/auth/login?oneSignalId=${oneSignalId}`, {
        email: email,
        password: password,
      });
  
      const { accessToken, user } = response.data;
      console.log('User Data:', user);
      console.log('Access Token:', accessToken);
  
      setAccessToken(accessToken);
  
      if (user.role.name === 'Admin') {
        navigation.navigate('AdminScreen', { accessToken, name: user.name });
      } else {
        navigation.navigate('Home', { accessToken, name: user.name });
      }
  
      Alert.alert('Success', t('loginScreen.loginSuccess'));
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

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{t('loginScreen.welcome')}</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('loginScreen.email')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder={t('')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('loginScreen.password')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder={t('')}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={globalStyles.buttonsContainer}>
        <Button title={t('loginScreen.loginButton')} onPress={handleLogin} />
      </View>
      <View style={globalStyles.buttonsContainer}>
        <Button title={t('loginScreen.activateUserButton')} onPress={handleActivateUser} />
        <Button title={t('loginScreen.forgetPasswordButton')} onPress={handleForgetPassword} />
      </View>
      <View style={globalStyles.languageContainer}>
        <Text style={globalStyles.languageText}>Choose Language:</Text>
        <LanguageOption
          title="English"
          onPress={() => handleChangeLanguage('en')}
          selected={i18n.language === 'en'}
        />
        <LanguageOption
          title="Français"
          onPress={() => handleChangeLanguage('fr')}
          selected={i18n.language === 'fr'}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
