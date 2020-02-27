//引入Koa
const koa = require('koa');

const app = new koa();

//配置koa中间件
app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

//监听端口
app.listen(3004, 'localhost', () => { console.log("koa 启动成功了===") });