// 使用dockerfile构建静态服务器

const Koa = require('koa')
const koaStatic = require('koa-static')
const app = new Koa()

const static = koaStatic('./dist')

app.use(static)

app.listen(8083)
