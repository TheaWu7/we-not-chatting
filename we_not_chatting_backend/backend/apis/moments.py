import json
import time

import nanoid
from fastapi import Header, Query, Path
from fastapi.responses import JSONResponse
from fastapi import status
from typing import Optional, List, Set
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


@app.get("/api/v1/moments")
def get_latest_moments(offset: Optional[int] = Query(None), Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    try:
        friends_id = Contact.select(Contact.friend_id).where(Contact.owner==user_id)
        posts: List[Moments] = Moments\
            .select()\
            .where((Moments.poster.in_(friends_id)) | (Moments.poster == user_id))\
            .order_by(Moments.time.desc())\
            .offset(offset)\
            .limit(20)
        data = GetLatestMomentsDataModel()
        data.posts = []
        res = GetLatestMomentsResponseModel(code=0, data=data)
        for post in posts:
            comments = json.loads(post.comments if post.comments is not None and post.likes != "" else "[]")
            p = MomentsPostModel(moments_id=post.id,
                                 wx_id=post.poster.wx_id,
                                 likes=json.loads(post.likes if post.likes is not None and post.likes != "" else "[]"),
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

    c = Contact\
        .select()\
        .where((Contact.owner == user_id) & (Contact.friend == user.id))\
        .orwhere((Contact.friend == user_id) & (Contact.owner == user.id))\
        .get_or_none()

    if (c is None):
        res = SimpleResponseModel(code=403, msg="对方不是你的好友")
        return JSONResponse(res.dict())

    moments = Moments.select().where(Moments.poster == user.id).limit(20).offset(offset)
    data = GetLatestMomentsDataModel()
    data.posts = []
    res = GetLatestMomentsResponseModel(code=0, data=data)

    for post in moments:
        comments = json.loads(post.comments if post.comments is not None and post.likes != "" else "[]")
        p = MomentsPostModel(moments_id=post.id,
                             wx_id=post.poster.wx_id,
                             likes=json.loads(post.likes if post.likes is not None and post.likes != "" else "[]"),
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

    return JSONResponse(res.dict())
