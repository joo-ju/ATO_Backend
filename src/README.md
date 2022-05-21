# API

[1. Goods ](#goods-goods)

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
