import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminScreen: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { accessToken } = route.params;

  const handleGoToUserAddScreen = () => {
    navigation.navigate('UserAddScreen', { accessToken }); // Pass the accessToken to UserAddScreen
  };

  const handleGoToUserListScreen = () => {
    navigation.navigate('UserListScreen', { accessToken }); // Pass the accessToken to UserListScreen
  };

  return (
    <View>
      <Text>AdminScreen</Text>
      <View style={{ marginVertical: 10 }}>
        <Button title="User Add Screen" onPress={handleGoToUserAddScreen} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="User List Screen" onPress={handleGoToUserListScreen} />
      </View>
    </View>
  );
};

export default AdminScreen;
