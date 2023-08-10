import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import { globalStyles } from '../styles';

// Define the type for the route params
type RootStackParamList = {
  UserAddScreenLite: { accessToken: string };
};

// Define the prop type for the AdminScreen component
type UserAddScreenLiteProps = {
  route: RouteProp<RootStackParamList, 'UserAddScreenLite'>;
  navigation: StackNavigationProp<RootStackParamList, 'UserAddScreenLite'>;
};

const UserAddScreenLite: React.FC<UserAddScreenLiteProps> = ({ route, navigation }) => {
  const { accessToken } = route.params; // Get the accessToken from the route params

  const { t } = useTranslation();

  const [users, setUsers] = useState<any[]>([]); // State to store the list of users
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState<string>(''); // Store department as a string
  const [company, setCompany] = useState<string>(''); // Store company as a string
  const [role, setRole] = useState<number | string>(''); // Store role as a number

  // Array of departments to display in the modal dropdown
  const departments = ['Genel Müdürlük', 'Yazılım Geliştirme'];

  // Array of companies to display in the modal dropdown
  const companies = ['Delta Akıllı Teknolojiler A.Ş.'];

  // Array of roles to display in the modal dropdown
  const roles = ['Manager'];

  // Function to fetch all users
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('https://delta.eu-west-1.elasticbeanstalk.com/users/all', {
        headers: { Authorization: accessToken },
      });
      setUsers(response.data.data.content);
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert(t('adminScreen.errorTitle'), t('adminScreen.errorMessage'));
    }
  };

  // useEffect to fetch all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Function to add a new user
  const handleAddUser = async () => {
    try {
      // Create a new user object with the form data
      const newUser = {
        name: name,
        surname: surname,
        email: email,
        roleId: roleOptions[role as keyof typeof roleOptions],
        departmentId: departmentOptions[department as keyof typeof departmentOptions],
        companyId: companyOptions[company as keyof typeof companyOptions],
      };

      // Make the API request to create the new user and pass the accessToken in the header
      const response = await axios.post(
        'https://delta.eu-west-1.elasticbeanstalk.com/users/create',
        newUser,
        { headers: { Authorization: accessToken } }
      );

      console.log('New User:', response.data);
      Alert.alert(t('adminScreen.successTitle'), t('adminScreen.successMessage'));

      // Refresh the user list after successful addition
      fetchAllUsers();
    } catch (error) {
      // Handle the error here
      if (error instanceof Error) {
        console.error('Error adding user:', error.message);
        Alert.alert(t('adminScreen.errorTitle'), error.message);
      } else {
        console.error('Unknown error:', error);
        Alert.alert(t('adminScreen.errorTitle'), t('adminScreen.errorMessage'));
      }
    }
  };

  // Mapping of human-readable department names to numeric values
  const departmentOptions = {
    'Genel Müdürlük': 1,
    'Yazılım Geliştirme': 2,
  };

  // Mapping of human-readable company names to numeric values
  const companyOptions = {
    'Delta Akıllı Teknolojiler A.Ş.': 1,
  };

  // Mapping of human-readable role names to numeric values
  const roleOptions = {
    Manager: 2,
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{t('adminScreen.title')}</Text>
      {/* Add User Form */}
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
          <ModalDropdown
            options={departments}
            onSelect={(index, department) => setDepartment(department)}
            style={globalStyles.dropdown}
            textStyle={globalStyles.dropdownText}
            dropdownStyle={globalStyles.dropdownDropdown}
            dropdownTextStyle={globalStyles.dropdownText}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.company')}</Text>
        <View style={globalStyles.inputBox}>
          <ModalDropdown
            options={companies}
            onSelect={(index, company) => setCompany(company)}
            style={globalStyles.dropdown}
            textStyle={globalStyles.dropdownText}
            dropdownStyle={globalStyles.dropdownDropdown}
            dropdownTextStyle={globalStyles.dropdownText}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>{t('adminScreen.role')}</Text>
        <View style={globalStyles.inputBox}>
          <ModalDropdown
            options={roles}
            onSelect={(index, role) => setRole(role)}
            style={globalStyles.dropdown}
            textStyle={globalStyles.dropdownText}
            dropdownStyle={globalStyles.dropdownDropdown}
            dropdownTextStyle={globalStyles.dropdownText}
          />
        </View>
      </View>
      <Button title={t('adminScreen.addUserButton')} onPress={handleAddUser} />

    </View>
  );
};

export default UserAddScreenLite;
