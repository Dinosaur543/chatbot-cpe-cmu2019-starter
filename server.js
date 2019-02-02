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
            "thumbnailImageUrl": "https://ichef.bbci.co.uk/news/660/cpsprodpb/1999/production/_92935560_robot976.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FB4B4E",
            "title": "SAO",
            "text": "Saowaluk Kaewnok",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://cpe.eng.cmu.ac.th/"
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
                  "label": "Detail",
                  "uri": "https://www.facebook.com/souwaluk.keawnok"
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














