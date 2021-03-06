const express = require('express')
const line = require('@line/bot-sdk')
const restClient = new (require('node-rest-client').Client)

/* require('dotenv').config() */
const app = express()

const config = {  ////
    channelAccessToken: 'VTkU72Yq8HsgSsVl+fdPp/OhnJTRgWzdOLKKM3rV/WXrOpQlSKim6OK9kFzcshdn/xiSGmUyTIawj5MxiP3L6EO8XUwC7BzrtYf5A4S3EFTAgyNQaKrgENEshrB9019PzhCdeiGKXJKJIJ1H/gM2PAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'ee001396d779984a00c6499821d79001'
  } ////

const client = new line.Client(config);

app.get('/', function (req, res) {
	res.send('03-pm2.5-bot')
})

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch(err => console.log('err', err))
});

function handleEvent(event) {
    console.log(event)
  if(event.type === 'message' && event.message.type === 'location') {
    return handleLocationEvent(event)
  }else {
    return Promise.resolve(null)
  }
}

function handleLocationEvent(event) {
  return new Promise((resolve, reject) => {
    restClient.get(`https://fathomless-reaches-36581.herokuapp.com/api?lat=${event.message.latitude}&long=${event.message.longitude}`, (data, response) => {
      if (data) {
        const pinData = data.map(row => ({
          "thumbnailImageUrl": row.aqi.icon,
          "imageBackgroundColor": "#FFFFFF",
          "title": `PM 2.5: ${row.aqi.aqi}`,
          "text": `${row.nameTH}, ${row.areaTH}`,
          "actions": [
            {
              "type": "uri",
              "label": "ข้อมูลย้อนหลัง",
              "uri": row.historyUrl
            }
          ]
        }))
    
        var msg = {
          "type": "template",
          "altText": "ข้อมูลสถานที่",
          "template": {
            "type": "carousel",
            "columns": pinData,
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
          }
        }

        resolve(client.replyMessage(event.replyToken, msg))
      } else {
        reject()
      }
    })
  })
 
}

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

