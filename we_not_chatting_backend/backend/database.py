from peewee import Model, MySQLDatabase, CharField, TextField, ForeignKeyField, IntegerField, SmallIntegerField


db = MySQLDatabase("WeNotChatting")
db.init("WeNotChatting", host="127.0.0.1", user="we_not_chatting", password="WeNotChatting")
db.connect()


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    id = CharField(max_length=16, primary_key=True)
    phone = CharField(max_length=11, null=True)
    email = CharField(max_length=50, null=True)
    password = CharField(null=True)
    nickname = CharField(max_length=15)
    avatar = TextField()
    wx_id = CharField(max_length=32)


class Contact(BaseModel):
    id = CharField(max_length=21, primary_key=True)
    owner = ForeignKeyField(User, related_name="owner", on_delete="CASCADE")
    friend = ForeignKeyField(User, related_name="friend", on_delete="CASCADE")
    remarks = CharField(max_length=15, null=True)


class Moments(BaseModel):
    id = CharField(max_length=21, primary_key=True)
    likes = TextField()
    comments = TextField()
    poster = ForeignKeyField(User)
    content = TextField()
    media = TextField()


class ChatHistory(BaseModel):
    id = CharField(max_length=32, primary_key=True)
    from_user = ForeignKeyField(User, related_name="from_user")
    to_user = ForeignKeyField(User, related_name="to_user")
    time = IntegerField()
    content = TextField()
    content_type = SmallIntegerField()

