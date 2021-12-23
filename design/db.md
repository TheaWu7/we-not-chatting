## User

| Key      | Type              |
| -------- | ----------------- |
| id       | Nanoid - char(16) |
| phone    | varchar(11)       |
| email    | varchar(50)       |
| password | varchar(32)       |
| nickname | varchar(15)       |
| avatar   | Text              |
| Wx_id    | Varchar(32)       |
|          |                   |

## Contact

| Key       | Type            |
| --------- | --------------- |
| id        | NanoId char(21) |
| Owner_id  | User.id         |
| friend_id | User.id         |
| remarks   | varchar(15)     |
|           |                 |

## Moments

| Key      | Type            |
| -------- | --------------- |
| id       | NanoId char(21) |
| likes    | Text - json     |
| comments | Text - json     |
| poster   | User.id         |
| content  | Text - 文字内容 |
| media    | Text - json     |
|          |                 |

## Chat History

| Key          | Type            |
| ------------ | --------------- |
| id           | NanoId char(32) |
| from         | User.id         |
| to           | User.id         |
| time         | Int             |
| content      | Text            |
| Content_type | Int             |
|              |                 |

