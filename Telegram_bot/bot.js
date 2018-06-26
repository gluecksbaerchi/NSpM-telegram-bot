const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const HTTP_Service = require('./Services/http_service');
const commandParts = require('telegraf-command-parts');
const session = require('telegraf/session');
const bot = new Telegraf(process.env.BOT_TOKEN);
const messages =require('./Services/message-service');

bot.use(commandParts());
bot.use(session());

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

bot.command('start', (ctx) => {
    ctx.reply(messages.start_msg);
});

bot.command('help', (ctx) => {
    return ctx.reply(messages.help_msg,
        Markup.inlineKeyboard([
            Markup.callbackButton(messages.inline_ask_msg, 'ask'),
            Markup.callbackButton(messages.inline_query_msg, 'query'),
        ]).extra()
    )
});

bot.action('ask', (ctx) => {
    return ctx.answerCbQuery(messages.inline_ask_answer, true)
});

bot.action('query', (ctx) => {
    return ctx.answerCbQuery(messages.inline_query_answer, true)
});


bot.command('cat', ({replyWithPhoto}) => replyWithPhoto('http://random.cat/view/' + getRandomInt(500)));

bot.command('ask', (ctx,next) => {
    if (ctx.state.command.args == '') {
        ctx.reply(messages.ask_param_msg);
    } else {
        HTTP_Service.post_question(ctx.state.command.args, function (err, body) {

            if (err || body.status == 'error') {
                ctx.reply(messages.ask_err_msg)
            } else {
                ctx.session.query = body.query;
                ctx.session.question = ctx.state.command.args;
                ctx.reply(messages.get_answer_by_type(body)).then(function(){
                    ctx.reply(messages.training_msg,
                        Markup.keyboard([
                            Markup.callbackButton(messages.training_yes, 'true'),
                            Markup.callbackButton(messages.training_no, 'false'),
                        ]).oneTime()
                            .resize()
                            .extra()
                    )
                });
            }
        });
    }
    return next();
});

bot.hears(messages.training_yes, (ctx) => {

    HTTP_Service.post_training(ctx.session.question,ctx.session.query, function (err, body) {
        if (!err || body.status != 'error')
        {
            ctx.reply(messages.training_answer_succes)
        } else{
            ctx.reply(messages.training_answer_fail)
        }
    });

});

bot.hears(messages.training_no, (ctx) => {
    ctx.reply(messages.training_answer_no)
});

bot.command('query', (ctx) => {
    if (ctx.state.command.args == '') {
        ctx.reply('You need to write your SPARQL query after /query if you want me to answer.');
    } else
        {
            HTTP_Service.post_query(ctx.state.command.args, function (err, body) {

                if (err || body.status == 'error') {
                    ctx.answer(messages.query_err_msg)
                } else {
                    ctx.reply(messages.get_answer_by_type(body));
                }
            });
        }
});

bot.startPolling();

module.exports = {};

