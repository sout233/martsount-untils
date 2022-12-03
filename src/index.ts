import { Bot, Context, Schema } from 'koishi'

export const name = 'martsount-untils'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.on('message', (session) => {
    if (session.content === '/help' || session.content === '!help' || session.content === '\\help' || session.content === '！help') {
      session.send(
        `画图：sai <tag> (暂不提供)\n在线代码：glot <-l 语言> <code> (默认C语言)\n疯狂星期四：发送“疯狂星期四”即可\n随机涩图：pic`);
    }
  })

  ctx.on('friend-request', async (session) => {
    await session.bot.handleFriendRequest(session.messageId, true)
    await session.bot.sendPrivateMessage(session.userId, 'Hi！')
  })

  ctx.on('bot-status-updated', (bot) => {
    bot.sendMessage('716877553',
      `Martsount已上线
    小石平台：${bot.platform}
    小石状态：${bot.status}
    小石sid：${bot.sid}`)
  })

  ctx.command('撤回 <message>')
    .action(async ({ session }, message) => {
      try {
        if (message === null) return '请回复你需要撤回的信息！'
        session.bot.deleteMessage(session.channelId, session.messageId)
      }
      catch {
        session.bot.sendMessage(session.channelId, 'Error!')
      }
    })

  ctx.command('getid <id:text>')
    .action(async ({ session }, id) => {
      if (id === null) return 'null id!'
      session.bot.sendMessage(session.channelId, id)
      const gotMessage = session.bot.getMessage(session.channelId, id)
      session.bot.sendMessage(session.channelId, `[Get ID(${id})]\n${(await gotMessage).content}`)
    })
}
