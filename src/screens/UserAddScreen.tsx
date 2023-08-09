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
  UserAddScreen: { accessToken: string };
};

// Define the prop type for the AdminScreen component
type UserAddScreenProps = {
  route: RouteProp<RootStackParamList, 'UserAddScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'UserAddScreen'>;
};

const UserAddScreen: React.FC<UserAddScreenProps> = ({ route, navigation }) => {
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
    Manager: 1,
  };

  // Render the header for the user data table
  const renderTableHeader = () => (
    <View style={globalStyles.userContainer}>
      <Text style={globalStyles.userHeaderText}>ID</Text>
      <Text style={globalStyles.userHeaderText}>Name</Text>
      <Text style={globalStyles.userHeaderText}>Surname</Text>
      <Text style={globalStyles.userHeaderText}>Role</Text>
      <Text style={globalStyles.userHeaderText}>Email</Text>
      <Text style={globalStyles.userHeaderText}>Department</Text>
      <Text style={globalStyles.userHeaderText}>Company</Text>
      {/* Add other header columns here */}
    </View>
  );

  // Render the list of users using FlatList
  const renderUserItem = ({ item }: { item: any }) => (
    <View style={globalStyles.userContainer}>
      <Text style={globalStyles.userText}>{item.id}</Text>
      <Text style={globalStyles.userText}>{item.name || 'N/A'}</Text>
      <Text style={globalStyles.userText}>{item.surname || 'N/A'}</Text>
      <Text style={globalStyles.userText}>{item.role?.name || 'N/A'}</Text>
      <Text style={globalStyles.userText}>{item.email || 'N/A'}</Text>
      <Text style={globalStyles.userText}>{item.department?.name || 'N/A'}</Text>
      <Text style={globalStyles.userText}>{item.company?.name || 'N/A'}</Text>
      {/* Add other user details here */}
    </View>
  );

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

      {/* Render the header */}
      {renderTableHeader()}

      {/* Render the list of users */}
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={globalStyles.userText}>No Data</Text>
      )}
    </View>
  );
};

export default UserAddScreen;
