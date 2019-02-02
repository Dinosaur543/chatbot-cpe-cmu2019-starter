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

   /*  client.replyMessage(event.replyToken, 
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
                "label": "Detail",
                "uri": "https://www.facebook.com/souwaluk.keawnok"
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
                  "label": "Major",
                  "uri": "http://cpe.eng.cmu.ac.th/"
                }
            ]
        }
      })
  }
  res.send('webhook success')//
  
}) */

client.replyMessage(event.replyToken, {
  "type": "template",
  "altText": "this is a carousel template",
  "template": {
      "type": "carousel",
      "columns": [
          {
            "thumbnailImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClp8wAeFFvhoZmVl3i83lpO2SPW1M51zDZY4dRzzr1a0i9VEU4Ahttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClp8wAeFFvhoZmVl3i83lpO2SPW1M51zDZY4dRzzr1a0i9VEU4A",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Nagisa",
            "text": "Assassination classroom",
            "actions": [
                {  
                    "type":"cameraRoll",
                    "label":"Camera roll"
                },
                {  
                  "type":"location",
                  "label":"Location"
               }
            ]
          },
          {
            "thumbnailImageUrl": "https://vignette.wikia.nocookie.net/bokunoheroacademia/images/d/d9/Izuku_Midoriya_school_profile.png/revision/latest/scale-to-width-down/145?cb=20190129015623",
            "imageBackgroundColor": "#FB4B4E",
            "title": "Midorima",
            "text": "My Hero academia",
            "actions": [
              {
                "type":"datetimepicker",
                "label":"Select date",
                "data":"storeId=12345",
                "mode":"datetime",
                "initial":"2017-12-25t00:00",
                "max":"2018-01-24t23:59",
                "min":"2017-12-25t00:00"
              },
              {  
                "type":"camera",
                "label":"Camera"
             }
          ]
          }
      ],
      "imageAspectRatio": "rectangle",
      "imageSize": "cover"
  }
})
}
})


app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})














