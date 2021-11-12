from django.contrib import admin
from .models import User, Blog, Category
from django_summernote.admin import SummernoteModelAdmin
# Register your models here.

class BlogAdmin(SummernoteModelAdmin):

    list_display = ('id', 'title', 'creator', 'category', 'timestamp')
    list_display_links = ('title', 'id')
    search_fields = ('title', 'category')
    list_per_page = 25
    summernote_fields = ('blogContent',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'timestamp')
    list_display_links = ('id', 'category')
    search_fields = ('category',)

admin.site.register(User)
admin.site.register(Blog, BlogAdmin)
admin.site.register(Category, CategoryAdmin)
