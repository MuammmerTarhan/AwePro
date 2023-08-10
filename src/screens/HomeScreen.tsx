import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles';

const HomeScreen: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { accessToken, name } = route.params; // Make sure you have 'userName' in route.params

  const handleGoToUserAddScreen = () => {
    navigation.navigate('UserAddScreenLite', { accessToken });
  };

  const handleGoToUserListScreen = () => {
    navigation.navigate('UserListScreenLite', { accessToken });
  };

  return (
    <View style={globalStyles.container}>
    <Text style={globalStyles.text}>Welcome, {name}!</Text>
    <View style={{ marginVertical: 10 }}>
        <Button title="User Add Screen" onPress={handleGoToUserAddScreen} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="User List Screen" onPress={handleGoToUserListScreen} />
      </View>
  </View>

  );
};

export default HomeScreen;
