const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const HTTP_Service = require('./Services/http_service');
const commandParts = require('telegraf-command-parts');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(commandParts());

const startMsg = `Welcome, you can use the following commands.
/ask - Ask a Question
/query - Query DBPedia
/add - add Training data
/cat - because everyone loves cats

Tip: type /help to get to know the commands in more detail`;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

bot.command('start', (ctx) => {
    ctx.reply(startMsg);
});

bot.command('help', (ctx) => {
    return ctx.reply('What do you want to do?',
        Markup.inlineKeyboard([
            Markup.callbackButton('Ask a Question', 'ask'),
            Markup.callbackButton('Query DBPedia', 'query'),
            Markup.callbackButton('Add training data', 'add')
        ]).extra()
    )
});

bot.action('ask', (ctx) => {
    return ctx.answerCbQuery(`type /ask followed by your question`, true)
});

bot.action('query', (ctx) => {
    return ctx.answerCbQuery(`type /query followed by your SPARQL query. You don\'t need to define prefixes because DBPedia knows most of them.`, true)
});

bot.action('add', (ctx) => {
    return ctx.answerCbQuery(`type /add question - query`, true)
});

bot.command('cat', ({replyWithPhoto}) => replyWithPhoto('http://random.cat/view/' + getRandomInt(500)));

bot.command('ask', (ctx) => {
    if (ctx.state.command.args == '') {
        ctx.reply('You need to tell me your question after /ask if you want me to answer.');
    } else {
        HTTP_Service.post_question(ctx.state.command.args, function (err, body) {

            if (err || body.status == 'error') {
                ctx.reply('Something went wrong. Maybe I can\'t answer your question.')
            } else {
                switch (body.type) {
                    case 'boolean':
                        ctx.reply(body.value ? 'Yes' : 'No');
                        break;
                    case 'string':
                        ctx.reply(body.value);
                        break;
                    case 'uri_list':
                        ctx.reply('Check those uris!')
                        for (var i = 0; i < body.value.length; i++) {
                            ctx.reply(body.value[i]);
                        }
                        break;
                    default:
                        ctx.reply('I have an answer but don\'t know how to present it to you.');
                }
            }
        });
    }
});

bot.command('query', (ctx) => {
    if (ctx.state.command.args == '') {
        ctx.reply('You need to write your SPARQL query after /query if you want me to answer.');
    } else
        {
            HTTP_Service.post_query(ctx.state.command.args, function (err, body) {

                if (err || body.status == 'error') {
                    ctx.reply('Something went wrong. Maybe your query is wrong or to complex.')
                } else {
                    switch (body.type) {
                        case 'boolean':
                            ctx.reply(body.value ? 'Yes' : 'No');
                            break;
                        case 'string':
                            ctx.reply(body.value);
                            break;
                        case 'uri_list':
                            ctx.reply('Check those uris!')
                            for (var i = 0; i < body.value.length; i++) {
                                ctx.reply(body.value[i]);
                            }
                            break;
                        default:
                            ctx.reply('I have an answer but don\'t know how to present it to you.');
                    }
                }
            });
        }
});

bot.startPolling();




module.exports = {};