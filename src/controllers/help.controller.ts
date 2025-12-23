import bot from '../lib/bot.js'
import { format } from '../utils/format.js'

const helpMessage = `
${format.bold('📖 Available Commands')}

${format.bold('/register')}
Register yourself to use the bot. Required before using other commands.

${format.bold('/add @user1 @user2... amount description')}
Add a debt to one or more users.
${format.italic('Example:')} /add @john 500 dinner last night

${format.bold('/get')}
View your current debt summary with all partners.

${format.bold('/history')}
View your complete debt transaction history.

${format.bold('/settle @user')}
Settle all debts with a specific user. The mentioned user must confirm the settlement.

━━━━━━━━━━━━━━━━━━━━

${format.bold('💡 Tips')}
• Positive amounts mean they owe you
• Negative amounts mean you owe them
• You can mention multiple users in /add
• Both @username and text mentions work
`

export const showHelp = async (update: Telegram.Message) => {
  await bot.sendMessage(update.chat.id, helpMessage, update.message_id)
}
