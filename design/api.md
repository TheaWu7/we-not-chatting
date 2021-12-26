## Login & Register

### Register

```http
POST /api/v1/user/register HTTP/1.1
Content-Type: application/json
```

```typescript
interface IRegisterRequestModel {
  phone: string;
  pwd: string;  // MD5
  verification: number;
}
```

```typescript
interface IRegisterResponseModel {
  code: number;
  msg?: string;
}
```

### Login

```http
POST /api/v1/user/login/phone HTTP/1.1
Content-Type: application/json
```

```http
POST /api/v1/user/login/email HTTP/1.1
```

```typescript
type ILoginRequestModel = IRegisterRequestModel
```

```typescript
interface ILoginResponseModel {
  code: number;
  msg?: string;
  data?: {
    user_id: string;
    token: string;
  }
}
```

### Send Verification Code

```http
POST /api/v1/send_verification HTTP/1.1
Content-Type: application/json
```

```typescript
interface ISendVerificationRequestModel {
  phone: string;
}
```

```typescript
interface ISendVerificationResponseModel {
  code: number;
  msg?: string;
}
```

## Common APIS

### Get User Info

```http
GET /api/v1/user/:id HTTP/1.1
```

```typescript
interface IGetUserInfoResponseModel {
  code: number;
  msg?: string;
  data?: {
    nickname: string;
    avatar: string;
  }
}
```

## Moments

### Get Latest Moments Posts

```http
GET /api/v1/moments?page=number HTTP/1.1
Authentication: TOKEN
```

```typescript
interface IMomentsMediaModel {
  type: number;
  content: string[];
}

interface IMomentsPost {
  wx_id: string;
  content: string;
  media?: IMomentsMediaModel;
  likes?: string[];
  comments?: string[];
  moments_id: string;
}

interface IGetMomentsResponseModel {
  code: number;
  msg?: string;
  data?: {
    posts: IMomentsPost[]
  }
}
```

### Post Moments

```http
POST /api/v1/moments HTTP/1.1
Authentication: TOKEN
```

```typescript
interface IPostMomentsRequestModel {
  content: string;
  media?: IMomentsMediaModel;
}
```

```typescript
interface IPostMomentsResponseModel {
  code: number;
  msg?: string;
}
```

### Delete Moments

```http
DELETE /api/v1/moments HTTP/1.1
Authentication: TOKEN
```

```typescript
interface IDeleteMomentRequestModel {
  moments_id: string;
}
```

```typescript
interface IDeleteMomentResponseModel {
  code: number;
  msg?: string;
}
```

### Likes

```http
POST /api/v1/moments/likes HTTP/1.1
Authentication: TOKEN
```

```typescript
interface ILikeMomentRequestModel {
  moments_id: string;
}
```

```typescript
interface ILikeMomentResponseModel {
  code: number;
  msg?: string;
}
```

### Comments

```http
POST /api/v1/moments/commments HTTP/1.1
Authentication: TOKEN
```

```typescript
interface ICommentMomentRequestModel {
  moments_id: string;
  comments: string;
}
```

```typescript
interface ICommentMomentResponseModel {
  code: number;
  msg?: string;
}
```



## Contact

### Add Friends

```http
POST /api/v1/contact/add HTTP/1.1
Authentication: TOKEN
```

```typescript
interface IContactAddRequestModel {
  wx_id: string;
  msg: string;	//验证信息
}
```

```typescript
interface IContactAddResponseModel {
  code: number;
  msg?: string;
}
```

### Remarks

```http
POST /api/v1/contact/remarks HTTP/1.1
Authentication: TOKEN
```

```typescript
interface IContactRemarksRequestModel {
  wx_id: string;
  name: string;
}
```

```typescript
interface IContactRemarksResponseModel {
  code: number;
  msg?: string;
}
```

### Delete Friends

```http
POST /api/v1/contact/delete HTTP/1.1
Authentication: TOKEN
```

```typescript
interface IContactDeleteRequestModel {
  wx_id: string;
}
```

```typescript
interface IContactDeleteResponseModel {
  code: number;
  msg?: string;
}
```



## User Profile

### Set user profile

```http
PUT /api/v1/user/info HTTP/1.1
Authentication: TOKEN
```

```typescript
interface ISetUserInfoRequestModel {
  avatar: string;
  nickname: string;
  wx_id: string;
}
```

```typescript
interface ISetUserInfoResponseModel {
  code: number;
  msg?: string;
}
```

