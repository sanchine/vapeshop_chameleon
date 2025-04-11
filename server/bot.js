const {Telegraf} = require('telegraf')
const API_TOKEN_TELEGRAM = "7376582573:AAG6ffTbymojFk2lcrIbebyquaN0kSmcgug"
const bot = new Telegraf(API_TOKEN_TELEGRAM)

bot.start((ctx) => {
    ctx.reply('Привет!')
})

bot.on('text', (ctx) => {
    ctx.reply(ctx.message.text)
})

bot.launch()

bot.catch((e) => {
    console.error(e)
})