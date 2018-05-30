process.env["NTBA_FIX_319"] = 1;

var Bot = require('node-telegram-bot-api');
var express = require('express');
var bodyParser = require('body-parser');
const token = '491825766:AAFEJ0vsOmEOBJr_KRJOcY9OWCweuIqQgzo';
const ngrok = require('ngrok');

var app = express();
var bot = new Bot(token);

ngrok.connect({proto: 'http', addr: '8080'}).then(result => {bot.setWebHook(result + '/' + bot.token);});

app.use(bodyParser.json());

app.post('/' + token, function (req,res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const url = 'https://telegram.org/img/t_logo.png';
    bot.sendPhoto(chatId, url);
});