from django.http import Http404
from .models import User, Blog, Category
from .serializers import BlogSerializer, CategorySerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

class BlogListView(generics.ListCreateAPIView):

    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogDetailView(generics.RetrieveAPIView):
    
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)


class CategoryPostListView(APIView):

    permission_classes = (permissions.AllowAny,)
    def get_queryset(self, category):
        try:
            pk = Category.objects.filter(category__iexact=category).first()
            return Blog.objects.filter(category=pk).all()
        except:
            return Http404

    def get(self, request, category, format=None):
        queryset = self.get_queryset(category)
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BlacklistTokenUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserBlogsView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        print(request.data)
        user_id = int(request.data.get('id'))
        queryset = User.objects.get(pk=user_id).author.all()
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)