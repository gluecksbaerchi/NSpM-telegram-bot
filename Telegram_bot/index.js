process.env["NTBA_FIX_319"] = 1;

var express = require('express');
var bodyParser = require('body-parser');
const token = '491825766:AAFEJ0vsOmEOBJr_KRJOcY9OWCweuIqQgzo';
const ngrok = require('ngrok');

var app = express();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {

    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"Hello dear user");
    }

});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});