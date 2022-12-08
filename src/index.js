const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3030

app.use(express.static('db'))
app.use(cors())
app.use(express.urlencoded({
  extended: false,
}))
app.use(express.json())

// lowcode 相关路由
app.use('/schema', require('./router/schema'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server start')
})
