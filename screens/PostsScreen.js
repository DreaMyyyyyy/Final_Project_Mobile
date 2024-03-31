import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
  }, []);

  const fetchPosts = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const response = await axios.get('http://192.168.1.137:8080/posts/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить список постов');
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const response = await axios.get('http://192.168.1.137:8080/current_user/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Ошибка загрузки текущего пользователя:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить текущего пользователя');
    }
  };

  const handlePostPress = (postId) => {
    navigation.navigate('PostDetail', { postId });
  };

  const handleAddPost = () => {
    navigation.navigate('CreatePost');

  };


  const handleLike = async (postId) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const postData = {
        post_id: postId,
        user_id: currentUser.id.id
      };
      const response = await axios.post(`http://192.168.1.137:8080/posts/${postId}/like/`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      Alert.alert('Успешно', 'Лайк успешно добавлен');
      fetchPosts(); // Обновляем список постов после лайка
    } catch (error) {
      console.error('Ошибка лайка:', error);
      Alert.alert('Ошибка', 'Повторное нажатие лайка');
    }
  };

  const handleAddComment = async (postId) => {
    navigation.navigate('CreateComment', { postId });
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <TouchableOpacity onPress={() => handlePostPress(item.id)}>
              <Text style={styles.postTitle}>{item.title}</Text>
            </TouchableOpacity>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => handleAddComment(item.id)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Комментарии</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Лайк</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Добавить пост" onPress={handleAddPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#00FFFF'

  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postContainer: {
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#CCFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


