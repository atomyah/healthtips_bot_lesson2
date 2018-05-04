var express = require('express')
var Twitter = require('twitter')
var CronJob = require("cron").CronJob
var mysql = require('mysql')

var app = express()

/*
var twitter = new Twitter({
  consumer_key: process.env['CONSUMER_KEY'],
  consumer_secret: process.env['CONSUMER_SECRET'],
  access_token_key: process.env['ACCESS_TOKEN_KEY'],
  access_token_secret: process.env['ACCESS_TOKEN_SECRET']
})
*/
var twitter = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})



//毎分0秒
var cronTime = '0 * * * * *'

new CronJob({
  cronTime: cronTime,
  onTick: function() {
    cycleTweet()
  },
  start: true
})


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test_user',
  password : 'password',
  database : 'test'
})


function cycleTweet() {

  connection.query('select tips from tips order by rand() limit 1', function(err, rows) {
    if(err) {
      return console.log(err)
    }else{
      tips = rows[0].tips
      console.log(tips)

      // 自動投稿
      twitter.post('statuses/update', {status: tips}, (err, tweet, response)=> {
        if(err) {
          return console.log(err)
        }else{
          return console.log(tweet)
        }
      })

    }
  })

}



app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(app.get('port'), function() {
  console.log("Node app is runnning at localhost:" + app.get('port'))
})
