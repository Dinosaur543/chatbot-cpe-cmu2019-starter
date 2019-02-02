const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client;
const app = express()

const config = {  ////
  channelAccessToken: 'VTkU72Yq8HsgSsVl+fdPp/OhnJTRgWzdOLKKM3rV/WXrOpQlSKim6OK9kFzcshdn/xiSGmUyTIawj5MxiP3L6EO8XUwC7BzrtYf5A4S3EFTAgyNQaKrgENEshrB9019PzhCdeiGKXJKJIJ1H/gM2PAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'ee001396d779984a00c6499821d79001'
} ////

const client = new Client(config)

app.get('/', function (req, res) {
    res.send('Hello World!!')
})

app.post('/webhook', middleware(config), (req, res) => {  //req = request
  const event = req.body.events[0];
  
  if (event.type === 'message') {
    const message = event.message;
    console.log(message)
    /* client.replyMessage(event.replyToken, {
      type: 'text',
      text: message.type,//change 
      

    }); */

    client.replyMessage(event.replyToken, 
      {
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png/revision/latest?cb=20150808131630",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://google.com/"
            },
            "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=123"
                },
                {
                  "type": "message",
                  "label": "Add to cart",
                  "text": "no no no"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://google.com"
                }
            ]
        }
      })
  }
  res.send('webhook success')//
  
})


app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})














