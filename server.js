const express = require('express')
const middleware = require('@line/bot-sdk').middleware  /////
const app = express()

const config = {  ////
  channelAccessToken: 'VTkU72Yq8HsgSsVl+fdPp/OhnJTRgWzdOLKKM3rV/WXrOpQlSKim6OK9kFzcshdn/xiSGmUyTIawj5MxiP3L6EO8XUwC7BzrtYf5A4S3EFTAgyNQaKrgENEshrB9019PzhCdeiGKXJKJIJ1H/gM2PAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'ee001396d779984a00c6499821d79001'
} ////

app.get('/', function (req, res) {
    res.send('Hello World!!')
})

app.post('/webhook', middleware(config), (req, res) => {
  res.send('owowowo')
})
app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})