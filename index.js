const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const md5 = require('md5');
const cors = require('@koa/cors');

const app = new Koa();
app.use(bodyParser());
app.use(cors());
const router = new Router();

router.post("/login", ctx => {
  const body = JSON.parse(ctx.request.rawBody);
  const fileData = [
    {
      id: 1,
      username: "buiduclong0511",
      password: md5("123@abc"),
      age: 21
    },
    {
      id: 2,
      username: "vuongtacuong",
      password: md5("123@ABC"),
      age: 21
    },
  ];
  if (!body.username || !body.password) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "Bad request!"
    }
    return;
  }
  const index = fileData.findIndex(user => user.username === body.username && user.password === md5(body.password));
  if (index > -1) {
    const resData = fileData[index];
    ctx.response.body = {
      data: resData,
      meta: {}
    };
  } else {
    ctx.response.status = 403;
    ctx.response.body = {
      message: "Forbidden"
    }
  }
})

router.get("/posts", ctx => {
  const resData = {
    posts: [
      {
        id: 1,
        name: "Post name 1",
        desc: "desc 1"
      },
      {
        id: 2,
        name: "Post name 2",
        desc: "desc 2"
      },
      {
        id: 3,
        name: "Post 3",
        desc: "desc 3"
      },
    ]
  }
  const q = ctx.request.query.q;
  if (resData.posts.length) {
    if (q) {
      const _resData = {};
      _resData.posts = resData.posts.filter(item => item.name.includes(q))
      ctx.body = _resData;
    } else {
      ctx.body = resData;
    }
  }
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
