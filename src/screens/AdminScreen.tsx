import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { globalStyles } from '../styles';

// Define the type for the route params
type RootStackParamList = {
  AdminScreen: { accessToken: string };
};

// Define the prop type for the AdminScreen component
type AdminScreenProps = {
  route: RouteProp<RootStackParamList, 'AdminScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'AdminScreen'>;
};

const AdminScreen: React.FC<AdminScreenProps> = ({ route, navigation }) => {
  const { accessToken } = route.params; // Get the accessToken from the route params

  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  const handleAddUser = async () => {
    try {
      // Create a new user object with the form data
      const newUser = {
        name: name,
        surname: surname,
        email: email,
        roleId: Number(role),
        departmentId: Number(department),
        companyId: Number(company),
      };
      // Make the API request to create the new user and pass the accessToken in the header
      const response = await axios.post('https://delta.eu-west-1.elasticbeanstalk.com/users/create', newUser, 
      { headers: { Authorization: accessToken }
    });
      
      console.log('New User:', response.data);
      Alert.alert(t('adminScreen.successTitle'), t('adminScreen.successMessage'));
    } catch (error: any) {
      Alert.alert(t('adminScreen.errorTitle'), error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{t('adminScreen.title')}</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.email')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder=""
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.name')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder=""
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.surname')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder=""
            onChangeText={(text) => setSurname(text)}
            value={surname}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.department')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder=""
            onChangeText={(text) => setDepartment(text)}
            value={department}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.company')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder=""
            onChangeText={(text) => setCompany(text)}
            value={company}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.role')}</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            placeholder=""
            onChangeText={(text) => setRole(text)}
            value={role}
          />
        </View>
      </View>
      <Button title={t('adminScreen.addUserButton')} onPress={handleAddUser} />
    </View>
  );
};

export default AdminScreen;
