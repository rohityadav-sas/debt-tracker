import bot from "../lib/bot.js"

export const format = {
  bold: (text: string) => `<b>${text}</b>`,
  italic: (text: string) => `<i>${text}</i>`,
  underline: (text: string) => `<u>${text}</u>`,
  code: (text: string) => `<code>${text}</code>`,
  pre: (text: string, language: string = '') =>
    `<pre><code class="language-${language}">${text}</code></pre>`,
  link: (text: string, url: string) => `<a href="${url}">${text}</a>`,
  listItem: (text: string) => `• ${text}`,

  icons: {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
    debt: '💸',
    history: '📜',
    user: '👤',
    positive: '🟢',
    negative: '🔴',
    neutral: '⚪',
  },

  success: (title: string, message: string) =>
    `<b>✅ ${title}</b>\n\n${message}`,

  error: (title: string, message: string) => `<b>❌ ${title}</b>\n\n${message}`,

  info: (title: string, message: string) => `<b>ℹ️ ${title}</b>\n\n${message}`,

  warning: (title: string, message: string) =>
    `<b>⚠️ ${title}</b>\n\n${message}`,
}

export const getDisplayName = (user: {
  _id?: number
  firstName?: string
  username?: string
}): string => {
  if (user.firstName && user.firstName.length > 2) {
    return user.firstName
  }
  if (user.username) {
    return `@${user.username}`
  }
  return `User ${user._id ?? 'Unknown'}`
}

export const sendProcessingMessage = async (chatId: number, replyToMsgId: number) => {
  return await bot.sendMessage(
    chatId,
    format.info('Processing', 'Processing your request, please wait...'),
    replyToMsgId
  )
}
