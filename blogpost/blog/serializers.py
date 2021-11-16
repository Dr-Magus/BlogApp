from blog.models import Blog, Category, User
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'



class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = '__all__'
        # exclude = ('creator',)

    # It will show the field name of Foreign Key field instead of id
    def to_representation(self, instance):
        rep = super(BlogSerializer, self).to_representation(instance)
        rep['category'] = instance.category.category
        rep['creator'] = instance.creator.username
        return rep

class UserSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

