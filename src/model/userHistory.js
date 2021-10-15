const mongoose = require("mongoose");

const { Schema } = mongoose;
const userHistorySchema = new Schema({
  userId: { type: String, default: "" }, // 사용자
  // 판매 내역
  sellGoods: [
    {
      title: { type: String }, // 제목
      categoryId: { type: String }, // 카테고리(스티커, 엽서 등)
      content: { type: String }, // 내용
      sellerId: { type: String }, // 판매자
      buyerId: { type: String }, // 구매자
      state: { type: String }, // 판매중, 예약 등 상태
      price: { type: Number }, // 결제 금액
      score: { type: Number }, // 별점 점수
      image: [], // 이미지
      tags: [], // 태그
      count: { type: Number }, // 후기 갯수
      enrollTime: { type: Date, default: Date.now }, // 등록 시간
      updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
      deleteTime: { type: Date }, // 취소 시간
    },
  ],
  // 구매 내역
  buyGoods: [
    {
      buyerId: { type: String }, // 구매자 ID
      goodsId: { type: String }, // 상품 ID
      amount: { type: Number }, // 구매 티켓 갯수
      price: { type: Number }, // 결제 금액
      enrollTime: { type: Date, default: Date.now }, // 등록 시간
    },
  ],
  // 공연 주최 내역
  event: [
    {
      name: { type: String }, // 행사 이름
      categoryId: { type: String }, // 카테고리(생일 등)
      discription: { type: String }, // 행사 설명
      sellerId: { type: String }, // 주최자 ID
      age: { type: Number }, // 연령 제한(_세 이상)
      price: { type: Number }, // 결제 금액
      score: { type: Number, default: 0 }, // 별점 점수
      count: { type: Number, default: 0 }, // 후기 갯수
      showTime: [
        {
          dateTime: Date, // 행사 날짜
          amount: Number, // 좌석 갯수
        },
      ],
      enrollTime: { type: Date, default: Date.now }, // 등록 시간
      updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
      deleteTime: { type: Date }, // 취소 시간
    },
  ],
  // 공연 구매 내역
  buyTicket: [
    {
      buyerId: { type: String }, // 구매자 ID
      eventId: { type: String }, // 행사 ID
      amount: { type: Number }, // 구매 티켓 갯수
      eventDateTime: { type: String }, // 행사 시간 (날짜 + 시간)
      state: { type: String }, // 취소 여부
      price: { type: Number }, // 결제 금액
      enrollTime: { type: Date, default: Date.now }, // 등록 시간
      updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
      deleteTime: { type: Date }, // 취소 시간
    },
  ],
  // 상품 찜 내역
  wishGoods: [
    // {
    //   title: { type: String, default: "" }, // 제목
    //   categoryId: { type: String, default: "" }, // 카테고리(스티커, 엽서 등)
    //   content: { type: String, default: "" }, // 내용
    //   sellerId: { type: String, default: "" }, // 판매자
    //   buyerId: { type: String, default: "" }, // 구매자
    //   state: { type: String, default: "판매중" }, // 판매중, 예약 등 상태
    //   price: { type: Number, default: 0 }, // 결제 금액
    //   score: { type: Number, default: 0 }, // 별점 점수
    //   wish: { type: Number, default: 0 }, // 찜 갯수
    //   chat: { type: Number, default: 0 }, // 채팅 갯수
    //   review: { type: Boolean, default: false }, // 채팅 갯수
    //   image: [], // 이미지
    //   tags: [], // 태그
    //   count: { type: Number, default: 0 }, // 후기 갯수
    //   enrollTime: { type: Date, default: Date.now }, // 등록 시간
    //   updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
    //   deleteTime: { type: Date }, // 취소 시간
    // },
  ],
});
module.exports = mongoose.model("userHistory", userHistorySchema);
