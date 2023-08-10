import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { globalStyles } from '../styles'; // Import your style definitions

export type RootStackParamList = {
  UserListScreenLite: { accessToken: string };
};

type UserListScreenLiteProps = {
  route: RouteProp<RootStackParamList, 'UserListScreenLite'>;
  navigation: StackNavigationProp<RootStackParamList, 'UserListScreenLite'>;
};

const UserListScreenLite: React.FC<UserListScreenLiteProps> = ({ route, navigation }) => {
  const { accessToken } = route.params;
  const { t } = useTranslation();

  const [users, setUsers] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

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

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = users.filter(user => user.email && user.email !== 'N/A');

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>{t('adminScreen.title')}</Text>
      <FlatList
        data={[{ isHeader: true }, ...sortedUsers]}
        renderItem={({ item }) => {
          if (item.isHeader) {
            // Render the header row
            return (
              <View style={[globalStyles.tableRow, globalStyles.tableHeader]}>
                <Text style={globalStyles.tableCell} onPress={() => handleSort('name')}>
                  Name{' '}
                  {sortConfig.key === 'name' && (
                    <Text>{sortConfig.direction === 'asc' ? '▲' : '▼'}</Text>
                  )}
                </Text>
                <Text style={globalStyles.tableCell}>Surname</Text>
                <Text style={globalStyles.tableCell}>Role</Text>
                <Text style={globalStyles.tableCell}>Email</Text>
                <Text style={globalStyles.tableCell}>Department</Text>
                <Text style={globalStyles.tableCell}>Options</Text>
              </View>
            );
          } else {
            // Render the user data rows
            return (
              <View style={globalStyles.tableRow}>
                <Text style={globalStyles.tableCell}>{item.name}</Text>
                <Text style={globalStyles.tableCell}>{item.surname}</Text>
                <Text style={globalStyles.tableCell}>{item.role?.name}</Text>
                <Text style={globalStyles.tableCell}>{item.email}</Text>
                <Text style={globalStyles.tableCell}>{item.department?.name}</Text>
                <View style={globalStyles.tableCell}>
                </View>
              </View>
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default UserListScreenLite;
