from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [

    #API Routes/Paths
    path('viewblogs', views.BlogListView.as_view(), name='viewblogs'),
    path('blogs/<str:slug>', views.BlogDetailView.as_view(), name='blogDetail'),
    path('category', views.CategoryListView.as_view(), name='category'),
    path('category/<str:category>', views.CategoryPostListView.as_view(), name='categoryPosts'),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('user/logout/blacklist/', views.BlacklistTokenUpdateView.as_view())

]