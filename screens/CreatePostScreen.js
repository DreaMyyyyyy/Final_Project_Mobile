import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const access_token = await AsyncStorage.getItem('access_token');
        const response = await axios.get('http://192.168.1.137:8080/current_user/', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setCurrentUser(response.data);
        getLocationPermission();
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
       Alert.alert('Permission denied', 'Please allow access to your location');
    } else {
      getLocation();
    }
  };

  const getLocation = async () => {
    try {
      const position = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error('Ошибка получения геолокации:', error);
    }
  };
  
  const handleCreatePost = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
  
      // Создаем объект данных для отправки на сервер
      const postData = {
        title: title,
        content: content,
        latitude: location.latitude,
        longitude: location.longitude,
        author: currentUser.id // Передаем объект текущего пользователя целиком
      };
  
      const response = await axios.post('http://192.168.1.137:8080/posts/', postData, {
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });
  
      Alert.alert('Успех', 'Пост создан');
      navigation.navigate('CreatePost');
      
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Ошибка', 'Не удалось создать пост');
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создание поста</Text> 
      <TextInput
        style={styles.input}
        placeholder="Заголовок"
        value={title}
        onChangeText={setTitle}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Содержание"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Подтвердить" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#00FFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    height: 150,
    backgroundColor:'#CCFFFF'
  },
});