const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');

const bot = new Telegraf(process.env.BOT_TOKEN);



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
    return ctx.answerCbQuery(`type /ask followed by your question`)
});

bot.action('query', (ctx) => {
    return ctx.answerCbQuery(`type /query followed by your SPARQL query`)
});

bot.action('add', (ctx) => {
    return ctx.answerCbQuery(`type /add question - query`)
});

bot.command('cat', ({ replyWithPhoto }) => replyWithPhoto('http://random.cat/view/' + getRandomInt(500)));

bot.startPolling();


module.exports = {

};