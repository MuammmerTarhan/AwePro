import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { globalStyles } from '../styles'; // Update this with the correct import path
import ModalDropdown from 'react-native-modal-dropdown'; // Import the ModalDropdown component
import { RootStackParamList } from './UserListScreen';

type EditPopupScreenProps = {
  route: RouteProp<RootStackParamList, 'EditPopupScreen'>;
  navigation: any;
};

const EditPopupScreen: React.FC<EditPopupScreenProps> = ({ route, navigation }) => {
  const { userId, accessToken } = route.params;
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>(''); // Change type as needed
  const [selectedRole, setSelectedRole] = useState<string>(''); // Change type as needed

  const departmentOptions = {
    'Genel Müdürlük': 1,
    'Yazılım Geliştirme': 2,
  };

  const roleOptions = {
    Admin: 0,
    Manager: 1,
  };

  const departments = Object.keys(departmentOptions);
  const roles = Object.keys(roleOptions);

  // Fetch user data and update state on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://delta.eu-west-1.elasticbeanstalk.com/users/${userId}`, {
          headers: {
            Authorization: accessToken,
          },
        });
        const user = response.data.data;
        setEmail(user.email);
        setName(user.name);
        setSurname(user.surname);
        setSelectedDepartment(user.department.name);
        setSelectedRole(user.role.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, accessToken]);

  const handleEdit = async () => {
    try {
      // Construct the updated user data
      const updatedUser = {
        name: name,
        surname: surname,
        email: email,
        roleId: roleOptions[selectedRole as keyof typeof roleOptions],
        departmentId: departmentOptions[selectedDepartment as keyof typeof departmentOptions],
      };

      // Send PUT request to update user data
      await axios.put(`https://delta.eu-west-1.elasticbeanstalk.com/users/${userId}`, updatedUser, {
        headers: {
          Authorization: accessToken,
        },
      });

      // Handle success, e.g., show a success message
      console.log('User data updated successfully');
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text>User ID: {userId}</Text>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Email:</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Name:</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Surname:</Text>
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.input}
            value={surname}
            onChangeText={setSurname}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Department:</Text>
        <View style={globalStyles.inputBox}>
          <ModalDropdown
            options={departments}
            defaultIndex={selectedDepartment ? departments.indexOf(selectedDepartment) : -1}
            onSelect={(index, value) => setSelectedDepartment(value)}
            style={globalStyles.dropdown}
            textStyle={globalStyles.dropdownText}
            dropdownStyle={globalStyles.dropdownDropdown}
            dropdownTextStyle={globalStyles.dropdownText}
          />
        </View>
      </View>
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Role:</Text>
        <View style={globalStyles.inputBox}>
          <ModalDropdown
            options={roles}
            defaultIndex={selectedRole ? roles.indexOf(selectedRole) : -1}
            onSelect={(index, value) => setSelectedRole(value)}
            style={globalStyles.dropdown}
            textStyle={globalStyles.dropdownText}
            dropdownStyle={globalStyles.dropdownDropdown}
            dropdownTextStyle={globalStyles.dropdownText}
          />
        </View>
      </View>
      <View style={globalStyles.buttonsContainer}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

export default EditPopupScreen;
