from rest_framework import serializers
from .models import Post, Comment, Like
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','content', 'author_id','latitude','longitude','title']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','content', 'author_id','post_id']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id','user_id', 'post_id']