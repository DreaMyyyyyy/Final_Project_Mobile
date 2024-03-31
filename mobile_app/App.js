import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PostsScreen from './screens/PostsScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import CreateCommentScreen from './screens/CreateCommentScreen';
import MapScreen from './screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Posts" component={PostsScreen} options={{ title: 'Posts' }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Post Detail' }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
        <Stack.Screen name="CreateComment" component={CreateCommentScreen} options={{ title: 'Create Comment' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map create' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

