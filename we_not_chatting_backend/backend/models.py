from django.db import models

# Create your models here.


class User(models.Model):
    id = models.CharField(max_length=16, primary_key=True)
    phone = models.CharField(max_length=11)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=32)
    nickname = models.CharField(max_length=15)
    avatar = models.TextField()
    wx_id = models.CharField(max_length=32)


class Contact(models.Model):
    id = models.CharField(max_length=21, primary_key=True)
    owner_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owner")
    friend_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="friend")
    remarks = models.CharField(User, max_length=15)


class Moments(models.Model):
    id = models.CharField(max_length=21, primary_key=True)
    likes = models.TextField()
    comments = models.TextField()
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    medis = models.TextField()


class ChatHistory(models.Model):

    class ContentTypeEnum(models.IntegerChoices):
        PICTURE = (0, "Picture")
        VIDEO = (1, "Video")
        STICKER = (2, "Sticker")
        NAME_CARD = (3, "NameCard")

    id = models.CharField(max_length=32, primary_key=True)
    from_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="from_user")
    to_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="to_user")
    time = models.IntegerField()
    content = models.TextField()
    content_type = models.SmallIntegerField(choices=ContentTypeEnum.choices)
