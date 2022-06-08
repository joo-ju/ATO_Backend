# API

[1. Goods ](#goods-goods)

[2. User ](#user)

[2. UserHistory ](#userhistory)

<br/>

## Goods

| Name                                      | Method | URL                  |
| ----------------------------------------- | ------ | -------------------- |
| [상품 모두 조회](#모든-상품-조회)         | GET    | /goods               |
| [상품 1개 조회 - id](#상품-1개-조회---id) | GET    | /goods/fetchOne/:id  |
| [상품 정보 수정](#상품-정보-수정)         | PUT    | /goods/updateGoods   |
| [상품 상태 수정](#상품-상태-수정)         | PUT    | /goods/update/status |

<br><br>

> ### 모든 상품 조회

`GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/goods**

##### Response

```bash
[{
    "key": "GD0",
    "categoryId": "",
    "buyerId": "",
    "score": 0,
    "wishCount": 0,
    "wishUser": [],
    "chat": 0,
    "review": false,
    "count": 0,
    "_id": "6160360b703cdfb3e31a3a3f",
    "title": "Test about sellerId",
    "content": "Post sellerId = joo",
    "sellerId": "joo",
    "state": "판매완료",
    "price": 10000,
    "image": [],
    "tags": [
        "Seller",
        "Joo"
    ],
    "enrollTime": "2021-10-08T12:14:03.494Z",
    "updateTime": "2021-10-08T12:14:03.494Z",
    "__v": 0
}]
```

> ### 상품 1개 조회 - id
>
> `GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/goods/fetchOne/:id**

##### Response

```bash
{
    "key": "",
    "categoryId": "",
    "buyerId": "",
    "score": 0,
    "wishCount": 0,
    "wishUser": [],
    "chat": 0,
    "review": false,
    "count": 0,
    "_id": "",
    "title": "",
    "content": "",
    "sellerId": "",
    "state": "",
    "price": 0,
    "image": [],
    "tags": [],
    "enrollTime": "",
    "updateTime": "",
    "__v": 0
}
```

> ### 상품 정보 수정
>
> `PUT`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/goods/updateGoods**

##### Request

```bash
{
    "_id": "",
    "title": "",
    "content": "",
    "price": 0,
    "tags": "",
    "updateTime": "",
    "sellerId": "",
}
```

##### Response

```bash
{
    "key": "",
    "categoryId": "",
    "buyerId": "",
    "score": 0,
    "wishCount": 0,
    "wishUser": [],
    "chat": 0,
    "review": false,
    "count": 0,
    "_id": "",
    "title": "",
    "content": "",
    "sellerId": "",
    "state": "",
    "price": 0,
    "image": [],
    "tags": [],
    "enrollTime": "",
    "updateTime": "",
    "__v": 0
}
```

> ### 상품 상태 수정
>
> `PUT`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/goods/update/status**

##### Request

```bash
{
    "_id": "",
    "status": "",
}
```

##### Response

```bash
{
    "key": "",
    "categoryId": "",
    "buyerId": "",
    "score": 0,
    "wishCount": 0,
    "wishUser": [],
    "chat": 0,
    "review": false,
    "count": 0,
    "_id": "",
    "title": "",
    "content": "",
    "sellerId": "",
    "state": "",
    "price": 0,
    "image": [],
    "tags": [],
    "enrollTime": "",
    "updateTime": "",
    "__v": 0
}
```

<br/>

## User

| Name                                                  | Method | URL           |
| ----------------------------------------------------- | ------ | ------------- |
| [사용자 모두 조회](#사용자-모두-조회)                 | GET    | /user         |
| [사용자 1명 조회 - userId](#사용자-1명-조회---userid) | GET    | /user/:userId |
| [사용자 로그인](#사용자-로그인)                       | POST   | /user/login   |
| [사용자 로그아웃](#사용자-로그아웃)                   | GET    | /user/logout  |
| [사용자 회원가입](#사용자-회원가입)                   | POST   | /user/signup  |
| [사용자 정보 수정](#사용자-정보-수정---userid)        | PUT    | /user/:userId |

<br><br>

> ### 사용자 모두 조회

`GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/goods**

##### Response

```bash
[{
    "_id": "616579dee6a40292c0bcab6a",
    "username": "Abcd",
    "password": "1234",
    "name": "최소한",
    "nickname": "Limit",
    "email": "Limit@gmail.com",
    "phone": 1022220987,
    "score": 0,
    "count": 0,
    "__v": 0
}]
```

> ### 사용자 1명 조회 - userId
>
> `GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/user/:userId**

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "username": "Abcd",
    "password": "1234",
    "name": "최소한",
    "nickname": "Limit",
    "email": "Limit@gmail.com",
    "phone": 1022220987,
    "score": 0,
    "count": 0,
    "__v": 0
}
```

> ### 사용자 로그인
>
> `POST`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/user/login**

##### Request

```bash
{
    "username": "Abcd",
    "password": "1234"
}
```

##### Response

```bash
{
    "user": {
        "id": "616579dee6a40292c0bcab6a",
        "username": "Abcd",
        "authorized": true
    }
}
```

> ### 사용자 로그아웃
>
> `GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/user/logout**

##### Response

```bash
{

}
```

> ### 사용자 회원가입
>
> `POST`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/user/signup**

##### Request

```bash
{
    "username": "",
    "password": "",
    "name": "",
    "nickname": "",
    "email": "",
    "phone": "",
    "image": ""
}
```

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "username": "Abcd",
    "password": "1234",
    "name": "최소한",
    "nickname": "Limit",
    "email": "Limit@gmail.com",
    "phone": 1022220987,
    "score": 0,
    "count": 0,
    "__v": 0
}
```

> ### 사용자 정보 수정 - userId
>
> `PUT`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/user/:userId**

##### Request

```bash
{
    "username": "",
    "password": "",
    "name": "",
    "nickname": "",
    "email": "",
    "phone": "",
    "image": ""
}
```

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "username": "Abcd",
    "password": "1234",
    "name": "최소한",
    "nickname": "Limit",
    "email": "Limit@gmail.com",
    "phone": 1022220987,
    "score": 0,
    "count": 0,
    "__v": 0
}
```

<br/>

## UserHistory

| Name                                                      | Method | URL                                 |
| --------------------------------------------------------- | ------ | ----------------------------------- |
| [UserHistory 등록](#userhistory-등록)                     | POST   | /userHistory                        |
| [UserHistory 조회 - userId](#userhistory-조회---userid)   | GET    | /userHistory/user/:userId           |
| [찜 상품 모두 조회 - userId](#찜-상품-모두-조회---userid) | GET    | /userHistory/user/wishGoods/:userId |
| [찜 상품 삭제](#찜-상품-삭제)                             | PUT    | /userHistory/wishGoods/delete       |
| [찜 상품 추가](#찜-상품-추가)                             | PUT    | /userHistory/wishGoods              |

<br><br>

> ### UserHistory 등록
>
> `POST`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/userHistory**

##### Request

```bash
{
    "userId": "",
}
```

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "sellGoods": [],
    "buyGoods": [],
    "event": [],
    "buyTicket": [],
    "wishGoods": [],
    "__v": 0
}
```

> ### UserHistory 조회 - userId
>
> `GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/userHistory/user/:userId**

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "userId": "616579dee6a40292c0bcab6a",
    "sellGoods": [],
    "buyGoods": [],
    "event": [],
    "buyTicket": [],
    "wishGoods": ["616579dee6a40292c0bcab6a"],
    "__v": 0
}
```

> ### 찜 상품 모두 조회 - userId
>
> `GET`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/userHistory/user/wishGoods/:userId**

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "userId": "616579dee6a40292c0bcab6a",
    "sellGoods": [],
    "buyGoods": [],
    "event": [],
    "buyTicket": [],
    "wishGoods": ["616579dee6a40292c0bcab6a"],
    "__v": 0
}
```

> ### 찜 상품 삭제
>
> `PUT`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/userHistory/wishGoods/delete**

##### Request

```bash
{
    "userId": "",
    "goodsId": ""
}
```

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "userId": "616579dee6a40292c0bcab6a",
    "sellGoods": [],
    "buyGoods": [],
    "event": [],
    "buyTicket": [],
    "wishGoods": [],
    "__v": 0
}
```

> ### 찜 상품 추가
>
> `PUT`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/userHistory/wishGoods**

##### Request

```bash
{
    "userId": "",
    "goodsId": ""
}
```

##### Response

```bash
{
    "_id": "616579dee6a40292c0bcab6a",
    "userId": "616579dee6a40292c0bcab6a",
    "sellGoods": [],
    "buyGoods": [],
    "event": [],
    "buyTicket": [],
    "wishGoods": ["616579dee6a40292c0bcab6a"],
    "__v": 0
}
```
