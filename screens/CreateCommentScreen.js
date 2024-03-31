import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateCommentScreen({ route }) {
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const { postId } = route.params;
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const userResponse = await axios.get('http://192.168.1.137:8080/current_user/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setCurrentUser(userResponse.data);

      const commentsResponse = await axios.get(`http://192.168.1.137:8080/posts/${postId}/comments/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateComment = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const postData = {
        content: content,
        author_id: currentUser.id,
        post_id: postId,
      };

      const response = await axios.post(`http://192.168.1.137:8080/posts/${postId}/comments/`, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });

      setComments([...comments, response.data]);
      setContent('');
      Alert.alert('Успех', 'Комментарий создан');
    } catch (error) {
      console.error('Error creating comment:', error);
      Alert.alert('Ошибка', 'Не удалось создать комментарий');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Комментарии к посту</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentContent}>{item.content}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Содержание"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Отправить" onPress={handleCreateComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00FFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#CCFFFF',
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commentContent: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    minHeight: 100,
    backgroundColor:'#FFFFFF',
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
