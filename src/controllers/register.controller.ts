import bot from '../lib/bot.js'
import connectDB from '../lib/mongodb.js'
import { upsertUser } from '../services/user.service.js'
import { format } from '../utils/format.js'

const registerUser = async (update: Telegram.Message) => {
	const chatId = update.chat.id
	const { id, username, first_name, last_name } = update.from
	try {
		await connectDB()
		await upsertUser({
			_id: id,
			username: username || '',
			firstName: first_name || '',
			lastName: last_name || ''
		})
		await bot.sendMessage(
			chatId,
			format.success(
				'Registration Successful',
				'You can now use the bot features.'
			),
			update.message_id
		)
	} catch (err) {
		console.error('Register User error:', err?.message || err)
		await bot.sendMessage(
			chatId,
			format.error(
				'Registration Failed',
				'An error occurred during registration. Please try again.'
			),
			update.message_id
		)
	}
}

export { registerUser }
