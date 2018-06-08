process.env["NTBA_FIX_319"] = 1;

var express = require('express');
const http = require('http');

var app = express();

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

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


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id,'Hey ' +  msg.from.first_name + ', what do you want to do?',{"reply_markup": {
        "keyboard": [["Ask a Question", "Query DBpedia"],["Add some Training Data"]] }
    });
});

bot.on('message', (msg) => {

    switch(msg.text) {
        case 'Ask a Question':
            bot.sendMessage(msg.chat.id, 'Let´s go! Ask me anything!');
            break;
        case 'Query DBPedia':
            break;
        case 'Add some Training Data':
            break;
        default:
    }
});

app.listen(8080, function () {
    console.log("Server listening on port 8080")
});