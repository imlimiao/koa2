//引入Koa
const koa = require('koa');
var router = require('koa-router')();
const views = require('koa-views');
const path = require('path')
const app = new koa();
console.log(__dirname, "__dirname");

// app.use(views(path.join(__dirname, '../views'), {
//     extension: 'ejs'
// }))
app.use(views('views', { extension: 'ejs' }));
//配置koa中间件
app.use(async (ctx, next) => {
    console.log("启动了中间件")
    let stime = new Date().getTime()
    ctx.state.stateSession = "哈哈哈session";
    await next()
    let etime = new Date().getTime()
    console.log(`请求地址: ${ctx.url}，响应时间：${etime - stime}ms`)
});

app.use(async (ctx, next) => {
    console.log('中间件1 doSomething')
    await next();
    console.log('中间件1 end')
})

app.use(async (ctx, next) => {
    console.log('中间件2 doSomething')
    await next();
    console.log('中间件2 end')
})

app.use(async (ctx, next) => {
    console.log('中间件3 doSomething')
    await next();
    console.log('中间件3 end')
})



router.get('/', async (ctx) => {
    console.log("主路由")
    let title = '宝宝是小神兽===';
    let list = ['mom', 'dad', 'grandmother', 'grandfather', '<h2>我是html标签</h2>'];
    await ctx.render('index', {
        title,
        list
    })
})

router.get('/news', async (ctx) => {
    console.log("news");

    ctx.body = "新闻列表页面";

})
//动态路由  http://localhost:3000/newscontent/xxxx
router.get('/newscontent/:aid', async (ctx) => {

    //获取动态路由的传值

    console.log(ctx.params, ctx.querystring); //{ aid: '456' }

    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>新闻消息列表哈哈哈</h1>'

})


app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
//监听端口
app.listen(3004, 'localhost', () => { console.log("koa 启动成功了===") });