process.env["NTBA_FIX_319"] = 1;

var express = require('express');
const token = '491825766:AAFEJ0vsOmEOBJr_KRJOcY9OWCweuIqQgzo';
const http = require('http');

var app = express();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

var post_options = {
    host: 'nspm',
    port: '5000',
    path: '/webhook',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};



var post_data = '{"result": {"parameters": {"question": "is carew cross a place"}}}';

bot.on('message', (msg) => {
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var json = JSON.parse(chunk);
            bot.sendMessage(msg.chat.id,json.displayText);
        });
    });

    post_req.write(post_data);
    post_req.end();
    console.log('huhu');

});

app.listen(8080, function () {

});