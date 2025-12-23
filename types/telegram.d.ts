declare namespace Telegram {
  interface ApiResponse {
    ok: true
    result: Message
  }

  interface User {
    id: number
    is_bot: boolean
    first_name: string
    last_name?: string
    username?: string
  }

  interface Chat {
    id: number
    type: 'private' | 'group' | 'supergroup' | 'channel'
    title?: string
    username?: string
    first_name?: string
    last_name?: string
  }

  interface Message {
    message_id: number
    from: User
    chat: Chat
    date: number
    text: string
    entities?: MessageEntity[]
  }

  interface MessageEntity {
    type: 'mention' | 'text_mention'
    offset: number
    length: number
    user?: User
  }

  interface SendMessage {
    reply_to_message_id?: number
    reply_markup?: object
    parse_mode?: 'HTML' | 'MarkdownV2'
  }

  interface CallbackQuery {
    id: string
    from: User
    message?: Message
    data?: string
    chat_instance: string
  }
}
