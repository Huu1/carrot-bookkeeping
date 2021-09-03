// eslint-disable-next-line import/no-commonjs
module.exports = {
  "GET /api/user/list": {
    statusCode: 200,
    message: "success",
    data: [
    ],
  },
  "GET /api/month": {
    statusCode: 200,
    message: "success",
    data: [
      {
        id: 1,
        date: "2021-9-1",
        week:'星期五',
        days: [
          {
            info: "晚餐",
            value: "23.3",
            class: "dinner"
          },
          {
            info: "交通",
            value: "2.3",
            class: "traffic"
          },
        ],
      },
      {
        id: 2,
        date: "2021-9-2",
        week:'星期三',
        days: [
          {
            info: "晚餐",
            value: "23.3",
            class: "dinner"
          },
        ],
      },
      {
        id: 3,
        date: "2021-9-3",
        week:'星期二',
        days: [
          {
            info: "晚餐",
            value: "23.3",
            class: "dinner"
          },
          {
            info: "饮食",
            value: "2.3",
            class: "traffic"
          },
          {
            info: "娱乐",
            value: "2.3",
            class: "traffic"
          },
        ],
      },
    ],
  },
}