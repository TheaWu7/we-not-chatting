import json
import time

import nanoid
from fastapi import Header, Query, Path
from fastapi.responses import JSONResponse
from fastapi import status
from typing import Optional, List, Set, Dict
from backend.models import PostMomentsModel, SimpleResponseModel, DeleteMomentsModel, GetLatestMomentsResponseModel, GetLatestMomentsDataModel
from backend.models.moments_model import MomentsPostModel, MomentsMediaModel, MomentsCommentModel, LikeMomentModel, CommentMomentModel
from backend.app import app
from backend.apis.common_response import AUTHENTICATION_FAILED_RESPONSE
from backend.services.authentication import auth_via_token
from backend.database import Moments, User, Contact


@app.post("/api/v1/moments")
def post_moments(data: PostMomentsModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user = User.get(id=user_id)

    moment = Moments.create(id=nanoid.generate(size=21),
                            content=data.content,
                            media=data.media.json() if data.media is not None else None,
                            poster=user.id,
                            likes="[]",
                            comments="[]",
                            time=time.time())
    moment.save()

    res = SimpleResponseModel(code=0, msg=None)
    return JSONResponse(res.dict())


@app.delete("/api/v1/moments")
def delete_moments(data: DeleteMomentsModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    moment: Moments = Moments.get_or_none(id=data.moments_id)
    if moment is None:
        res = SimpleResponseModel(code=404, msg="Moment post not found")
        return JSONResponse(res.dict())

    if moment.poster.id == user_id:
        moment.delete_instance()

    res = SimpleResponseModel(code=0, msg=None)
    return JSONResponse(res.dict())


def generateMomentsResponse(posts, friends_id: List[str]):
    data = GetLatestMomentsDataModel()
    data.posts = []
    res = GetLatestMomentsResponseModel(code=0, data=data)
    for post in posts:
        likes: List[str] = json.loads(post.likes if post.likes is not None and post.likes != "" else "[]")
        comments: List[Dict[str, str]] = json.loads(post.comments if post.comments is not None and post.comments != "" else "[]")

        filtered_comments = []
        filtered_likes = []
        for i in range(len(comments)):
            if comments[i]["wx_id"] in friends_id:
                filtered_comments.append(comments[i])
        for i in range(len(likes)):
            if likes[i] in friends_id:
                filtered_likes.append(likes[i])
        p = MomentsPostModel(moments_id=post.id,
                             wx_id=post.poster.wx_id,
                             likes=filtered_likes,
                             comments=filtered_comments,
                             content=post.content,
                             time=post.time
                             )
        p.comments = []
        for comment in comments:
            c: MomentsCommentModel = MomentsCommentModel.parse_obj(comment)
            p.comments.append(c)

        if post.media is not None:
            media = json.loads(post.media)
            p.media = MomentsMediaModel.parse_obj(media)

        data.posts.append(p)

    return res


def get_friend_list(user_id: str):
    friend_tbl = User.alias()
    user_tbl = User.alias()
    friends_wxid = Contact.select() \
        .where(Contact.owner == user_id) \
        .orwhere(Contact.friend == user_id) \
        .join(friend_tbl, on=(friend_tbl.id == Contact.owner)) \
        .switch(Contact) \
        .join(user_tbl, on=(user_tbl.id == Contact.friend))
    friends = set()
    user = User.get(id=user_id)
    friends.add(user.wx_id)
    for f in friends_wxid:
        friends.add(f.friend.wx_id)
        friends.add(f.owner.wx_id)

    print(friends)
    return list(friends)


@app.get("/api/v1/moments")
def get_latest_moments(offset: Optional[int] = Query(None), Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    try:
        friends_id = Contact.select(Contact.owner).where(Contact.owner==user_id).orwhere(Contact.friend==user_id)
        friends_id_2 = Contact.select(Contact.friend).where(Contact.owner==user_id).orwhere(Contact.friend==user_id)
        posts: List[Moments] = Moments\
            .select()\
            .where((Moments.poster.in_(friends_id)) | (Moments.poster.in_(friends_id_2)) | (Moments.poster == user_id))\
            .order_by(Moments.time.desc())\
            .offset(offset)\
            .limit(20)

        friends = get_friend_list(user_id)

        print(posts)
        res = generateMomentsResponse(posts, friends)

        return JSONResponse(res.dict())

    except Exception as e:
        res = SimpleResponseModel(code=-1, msg=str(e))
        return JSONResponse(res.dict())


@app.post("/api/v1/moments/like")
def like_moments(data: LikeMomentModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)
    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    post: Moments = Moments.get_or_none(id=data.moments_id)
    if post is None:
        res = SimpleResponseModel(code=-1, msg="Post Not Found")
        return JSONResponse(res.dict())

    user = User.get(id=user_id)

    likes: Set[str] = set(json.loads(post.likes if post.likes is not None and post.likes != "" else "[]"))
    if user_id not in likes:
        likes.add(user.wx_id)
    post.likes = json.dumps(list(likes))
    post.save()

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())


@app.post("/api/v1/moments/comment")
def comment_post(data: CommentMomentModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    post: Moments = Moments.get_or_none(id=data.moment_id)
    if post is None:
        res = SimpleResponseModel(code=-1, msg="Post Not Found")
        return JSONResponse(res.dict())

    user = User.get(id=user_id)

    comments_json: List = json.loads(post.comments if post.comments is not None and post.comments != "" else "[]")
    comments: List[MomentsCommentModel] = [MomentsCommentModel.parse_obj(c) for c in comments_json]
    comments.append(MomentsCommentModel(wx_id=user.wx_id, content=data.comment))

    comments_json = [c.dict() for c in comments]
    post.comments = json.dumps(comments_json)

    post.save()

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())


@app.get("/api/v1/moments/{user_wxid}")
def get_user_moments(user_wxid: str = Path(None), Authentication: Optional[str] = Header(None), offset: Optional[int] = Query(0)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user = User.get_or_none(wx_id=user_wxid)
    if user is None:
        res = SimpleResponseModel(code=404, msg="User Not Found")
        return JSONResponse(res.dict())

    friend_list = get_friend_list(user_id)

    if (user.wx_id not in friend_list):
        res = SimpleResponseModel(code=403, msg="对方不是你的好友")
        return JSONResponse(res.dict())

    moments = Moments.select().where(Moments.poster == user.id).order_by(Moments.time.desc()).limit(20).offset(offset)
    friends = get_friend_list(user_id)
    res = generateMomentsResponse(moments, friends)
    return JSONResponse(res.dict())
