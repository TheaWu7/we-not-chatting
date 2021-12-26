import json

from fastapi import Header, Query
from fastapi.responses import JSONResponse
from fastapi import status
from typing import Optional, List
from backend.models import PostMomentsModel, SimpleResponseModel, DeleteMomentsModel, GetLatestMomentsResponseModel
from backend.models.moments_model import MomentsPostModel, MomentsMediaModel, MomentsCommentModel
from backend import app
from backend.apis import AUTHENTICATION_FAILED_RESPONSE
from backend.services.authentication import auth_via_token
from backend.database import Moments, User


@app.post("/api/v1/moments")
def post_moments(data: PostMomentsModel, Autentication: Optional[str] = Header(None)):
    if Autentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    user_id = auth_via_token(Autentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    user = User.get(id=user_id)

    moment = Moments.create()
    moment.content = data.content
    moment.media = data.media.json()
    moment.poster = user
    moment.save()

    res = SimpleResponseModel(code=0, msg=None)
    return JSONResponse(res.json())


@app.delete("/api/v1/moments")
def delete_moments(data: DeleteMomentsModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    Moments.delete_by_id(data.moments_id)

    res = SimpleResponseModel(code=0, msg=None)
    return JSONResponse(res.json())


@app.get("/api/v1/moments")
def get_latest_moments(offset: Optional[int] = Query(None)):
    try:
        posts: List[Moments] = Moments.select().order_by(Moments.time.desc()).offset(offset).limit(20)
        res = GetLatestMomentsResponseModel()
        for post in posts:
            p = MomentsPostModel()
            p.moments_id = post.id
            p.wx_id = post.poster
            p.likes = json.loads(post.likes if post.likes is not None else "[]")
            comments = json.loads(post.comments if post.comments is not None else "[]")
            p.comments = []
            for comment in comments:
                c: MomentsCommentModel = MomentsCommentModel.parse_obj(comment)
                p.comments.append(c)


    except Exception as e:
        res = SimpleResponseModel(code=-1, msg=str(e))
        return JSONResponse(res, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

