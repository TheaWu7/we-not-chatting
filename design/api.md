## Login & Register

### Register

```http
POST /api/v1/user/register
Content-Type: application/json
```

```typescript
interface IRegisterRequestModel {
  // email or phone, choose one
  email?: string;
  phone?: string;
  // password or verification, choose one
  pwd?: string;  // MD5
  // 短信验证码
  verification?: number;
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
POST /api/v1/user/login
Content-Type: application/json
```

```typescript
type ILoginRequestModel = IRegisterRequestModel
```

```typescript
interface ILoginResponseModel {
  code: number;
  msg?: string;
  data?: {
    token: string;
  }
}
```

### Send Verification Code

```http
POST /api/v1/send_verification
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
GET /api/v1/user/:id
```

```typescript
interface IGetUserInfoResponseModel {
  code: number;
  msg?: string;
  data?: {
    nickname: string;
    avatar: string;
    wx_id: string;
  }
}
```

## Moments

### Get Latest Moments Posts

```http
GET /api/v1/moments?page=number
Authentication: TOKEN
```

```typescript
interface IMomentsMediaModel {
  type: number;
  content: string[];
}

interface IGetMomentsResponseModel {
  code: number;
  msg?: string;
  data?: {
    wx_id: string;
    content: string;
    media?: IMomentsMediaModel;
    likes?: string[];
    comments?: string[];
    moments_id: string;
  }
}
```

### Post Moments

```http
POST /api/v1/moments
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
DELETE /api/v1/moments
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
POST /api/v1/moments/likes
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
POST /api/v1/moments/commments
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

