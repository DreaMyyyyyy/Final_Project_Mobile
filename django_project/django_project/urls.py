from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from posts.views import PostCreateView, PostDetailView, CommentListCreateView, LikeListCreateView, RegisterView, welcome, LoginView, CommentCreateView,LikeListCreateView,LogoutView,CurrentUserView,LikeCreateView,LikeDestroyView
urlpatterns = [
    path('', welcome, name='welcome'),  # Главная страница
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Получение пары токенов при входе
    path('logout/', LogoutView.as_view(), name='logout'),  # Выход из системы
    path('register/', RegisterView.as_view(), name='register'),  # Представление для регистрации
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Обновление токена доступа
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Проверка действительности токена
    path('posts/', PostCreateView.as_view(), name='post-list'),  # Список всех постов и создание новых постов
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),  # Детали конкретного поста
    path('posts/<int:post_id>/comments/', CommentCreateView.as_view(), name='comments'),  # Создание комментариев к посту
    path('likes/', LikeListCreateView.as_view(), name='like-list'),  # Список всех лайков и создание новых лайков
    path('posts/<int:post_id>/like/', LikeCreateView.as_view(), name='like-create'),  # Лайк поста
    path('current_user/', CurrentUserView.as_view(), name='current_user'),  # Текущий пользователь
    path('posts/<int:pk>/unlike/', LikeDestroyView.as_view(), name='like-destroy'),  # Удаление лайка
]