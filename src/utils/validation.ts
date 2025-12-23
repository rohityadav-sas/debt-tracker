import { AppError } from './AppError.js'

export const validateAddDebt = (
	msg: string,
	entities: Telegram.Message['entities'] = []
) => {
	const users = {
		ids: [] as Telegram.User[],
		usernames: [] as string[]
	}

	let maxOffset = 0

	for (const entity of entities) {
		const end = entity.offset + entity.length
		maxOffset = Math.max(maxOffset, end)

		if (entity.type === 'mention') {
			const mention = msg.slice(entity.offset, end)
			users.usernames.push(mention.replace(/^@/, ''))
		}

		if (entity.type === 'text_mention' && entity.user) {
			users.ids.push(entity.user)
		}
	}

	users.ids = [...new Map(users.ids.map((u) => [u.id, u])).values()]
	users.usernames = [...new Set(users.usernames)]

	if (!users.ids.length && !users.usernames.length)
		throw new AppError(
			'Incorrect format. Mention at least one user. Use /help.'
		)

	const restMsg = msg.slice(maxOffset).trim()
	const [amountStr, ...descParts] = restMsg.split(/\s+/)

	const amount = Number(amountStr)
	if (isNaN(amount)) throw new AppError('Invalid amount specified.')

	const description = descParts.join(' ')
	if (!description) throw new AppError('Description is required.')

	return { users, amount, description }
}

export const validateSettleDebt = (
	msg: string,
	entities: Telegram.Message['entities'] = []
) => {
	const entity = entities.find(
		(e) => e.type === 'mention' || e.type === 'text_mention'
	)

	if (!entity) {
		throw new AppError(
			'Incorrect format. Mention at least one user to settle debt with. Use /help.'
		)
	}

	const mentionedText = msg.slice(entity.offset, entity.offset + entity.length)
	if (entity.type === 'text_mention') {
		return { userId: entity.user.id }
	}

	return {
		username: mentionedText.replace(/^@/, '')
	}
}
