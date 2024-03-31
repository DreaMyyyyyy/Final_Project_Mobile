import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const access_token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`http://192.168.1.137:8080/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Ошибка загрузки поста:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleOpenMap = (latitude, longitude) => {
    navigation.navigate('Map', { latitude, longitude });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : post ? (
        <>
          <Text style={styles.title}>Детали поста</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Заголовок:</Text>
            <Text style={styles.content}>{post.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Содержание:</Text>
            <Text style={styles.content}>{post.content}</Text>
          </View>
          <TouchableOpacity onPress={() => handleOpenMap(post.latitude, post.longitude)} style={styles.mapButton}>
            <Text style={styles.mapButtonText}>Открыть карту</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.error}>Не удалось загрузить детали поста.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#00FFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    width: '100%', // Растягиваем на всю ширину
    marginBottom: 20,
    backgroundColor: '#CCFFFF',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  mapButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});