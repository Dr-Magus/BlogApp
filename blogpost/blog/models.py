from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.template.defaultfilters import slugify
from datetime import datetime
from django.utils import timezone
# Create your models here.

class User(AbstractUser):
    pass

class Category(models.Model):

    category = models.CharField(max_length=60, default="")
    timestamp = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):

        self.category = self.category.title()
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.category

    class Meta:
        ordering = ('timestamp',)

categories = [
    ('science', 'Science'),
    ('technology', 'Technology'),
    ('food', 'Food'),
    ('books', 'Books'),
    ('business', 'Business'),
    ('other', 'Other')
]

class Blog(models.Model):

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    title = models.CharField(max_length=50, blank=True)
    slug = models.SlugField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='categoryName')
    excerpt = models.CharField(max_length=60, blank=True)
    blogContent = models.TextField(default='')
    timestamp = models.DateTimeField(default=timezone.now)
    thumbnail = models.ImageField(upload_to='thumbnail/%Y-%m-%d/', blank=True)
    likes = models.ManyToManyField(User, blank=True, related_name='likers')

    def save(self, *args, **kwargs):
        if not self.slug:
            # self.creator = request.user
            self.slug = slugify(self.title)
        super(Blog, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        ordering = ('-timestamp',)