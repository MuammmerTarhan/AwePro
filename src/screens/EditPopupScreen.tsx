import React from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './UserListScreen'; // Import the RootStackParamList from UserListScreen

type EditPopupScreenProps = {
  route: RouteProp<RootStackParamList, 'EditPopupScreen'>;
  navigation: any; // Use the "any" type for navigation if you're unsure about the exact type
};

const EditPopupScreen: React.FC<EditPopupScreenProps> = ({ route, navigation }) => {
  const { userId, accessToken } = route.params;

  const handleCancel = () => {
    // Go back to the UserListScreen without any changes
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User ID: {userId}</Text>
      <Text>Access Token: {accessToken}</Text>
      {/* You can add your content here */}
      <Button title="Edit" onPress={() => console.log("Edit pressed")} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
};

export default EditPopupScreen;
