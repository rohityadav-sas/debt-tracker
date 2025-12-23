import axios from './axios.js'

class Bot {
	async sendMessage(
		chat_id: number,
		text: string,
		msg_id: number,
		options?: Telegram.SendMessage
	) {
		try {
			const response = await axios.post<Telegram.ApiResponse>('/sendMessage', {
				chat_id,
				text,
				reply_to_message_id: msg_id,
				parse_mode: 'HTML',
				...options
			})
			return response.data.result.message_id
		} catch (err) {
			console.error(
				'Error sending message:',
				err.response?.data?.description || err?.message || ''
			)
		}
	}

	async editMessage(
		chat_id: number,
		message_id: number,
		text: string,
		options?: Telegram.SendMessage
	) {
		try {
			await axios.post('/editMessageText', {
				chat_id,
				message_id,
				text,
				parse_mode: 'HTML',
				...options
			})
		} catch (err) {
			console.error(
				'Error editing message:',
				err.response?.data?.description || err?.message || ''
			)
		}
	}

	async deleteMessage(chat_id: number, message_id: number) {
		try {
			await axios.post<Telegram.ApiResponse>('/deleteMessage', {
				chat_id,
				message_id
			})
		} catch (err) {
			console.error(
				'Error deleting message:',
				err.response?.data?.description || err?.message || ''
			)
		}
	}

	async answerCallbackQuery(callback_query_id: string, text?: string) {
		try {
			await axios.post('/answerCallbackQuery', {
				callback_query_id,
				text
			})
		} catch (err) {
			console.error(
				'Error answering callback:',
				err.response?.data?.description || err?.message || ''
			)
		}
	}
}

export default new Bot()
