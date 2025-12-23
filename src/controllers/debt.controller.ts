import bot from '../lib/bot.js'
import connectDB from '../lib/mongodb.js'
import { validateAddDebt, validateSettleDebt } from '../utils/validation.js'
import {
  createDebt,
  getDebts,
  getDebtSummary,
  getDebtBetweenUsers,
} from '../services/debt.service.js'
import {
  getUserByPartner,
  getUserByTelegramId,
  getUserByUsername,
  adjustDebtWithPartner,
} from '../services/user.service.js'
import User from '../models/user.model.js'
import mongoose from 'mongoose'
import { format, getDisplayName } from '../utils/format.js'

const addDebt = async (update: Telegram.Message) => {
  const chatId = update.chat.id
  const { id } = update.from
  const { users, amount, description } = validateAddDebt(
    update.text,
    update.entities
  )
  await connectDB()
  const author = await getUserByTelegramId([id])
  if (author.length === 0) {
    return await bot.sendMessage(
      chatId,
      format.warning(
        'Not Registered',
        'You are not registered. Use /register to use the bot.'
      ),
      update.message_id
    )
  }

  const [usersByTelegramId, usersByUsername] = await Promise.all([
    getUserByTelegramId(users.ids.map((u) => u.id)),
    getUserByUsername(users.usernames),
  ])

  const foundTelegramIds = new Set(usersByTelegramId.map((u) => u._id))
  const foundUsernames = new Set(usersByUsername.map((u) => u.username))

  const notFoundTelegramIds = users.ids.filter(
    (u) => !foundTelegramIds.has(u.id)
  )
  const notFoundUsernames = users.usernames.filter(
    (u) => !foundUsernames.has(u)
  )

  if (notFoundTelegramIds.length || notFoundUsernames.length) {
    const missingNames = [
      ...notFoundTelegramIds.map((u) => u.first_name),
      ...notFoundUsernames,
    ].join(', ')

    return await bot.sendMessage(
      chatId,
      format.warning(
        'Users Not Found',
        `The following users are not registered: ${format.bold(
          missingNames
        )} \nTell them to register using /register command`
      ),
      update.message_id
    )
  }

  const partners = [...usersByTelegramId, ...usersByUsername]
  if (partners.some((p) => p._id === id)) {
    return await bot.sendMessage(
      chatId,
      format.warning('Invalid Operation', 'You cannot add debt to yourself.'),
      update.message_id
    )
  }

  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      for (const partner of partners) {
        await createDebt(
          {
            group: chatId,
            author: author[0]._id,
            partner: partner._id,
            amount: amount,
            description,
            createdAt: new Date(),
          },
          session
        )
        const [authorHasDebt, partnerHasDebt] = await Promise.all([
          getUserByPartner(author[0]._id, partner._id),
          getUserByPartner(partner._id, author[0]._id),
        ])
        if (!authorHasDebt) {
          await User.updateOne(
            { _id: author[0]._id },
            {
              $push: { totalDebt: { partner: partner._id, amount: amount } },
            },
            { session }
          )
        } else {
          await User.updateOne(
            { _id: author[0]._id, 'totalDebt.partner': partner._id },
            { $inc: { 'totalDebt.$.amount': amount } },
            { session }
          )
        }

        if (!partnerHasDebt) {
          await User.updateOne(
            { _id: partner._id },
            {
              $push: {
                totalDebt: { partner: author[0]._id, amount: -amount },
              },
            },
            { session }
          )
        } else {
          await User.updateOne(
            { _id: partner._id, 'totalDebt.partner': author[0]._id },
            { $inc: { 'totalDebt.$.amount': -amount } },
            { session }
          )
        }
      }
    })
  } finally {
    session.endSession()
  }
  const formattedPartners = partners.map((p) => getDisplayName(p)).join(', ')

  return await bot.sendMessage(
    chatId,
    format.success(
      'Debt Added',
      `Debt added successfully to ${format.bold(formattedPartners)} \n
${format.listItem(`Amount: ${format.bold(amount.toString())}`)}
${format.listItem(`Description: ${format.italic(description)}`)}`
    ),
    update.message_id
  )
}

const getDebt = async (update: Telegram.Message) => {
  await connectDB()
  const author = await getUserByTelegramId([update.from.id])
  if (author.length === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.warning(
        'Not Registered',
        'You are not registered. Use /register to use the bot.'
      ),
      update.message_id
    )
  }

  const debtSummary = await getDebtSummary(author[0]._id, update.chat.id)

  if (debtSummary.length === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.info('No Debts', 'No debts found in this group.'),
      update.message_id
    )
  }

  const message = debtSummary
    .map((debt) => {
      const name = getDisplayName(debt.partner)
      const amount = debt.amount
      const sign = amount > 0 ? '+' : ''
      const symbol = amount > 0 ? format.icons.positive : format.icons.negative
      return `${symbol} ${format.bold(name)} → ${format.code(
        sign + amount.toString()
      )}`
    })
    .join('\n')

  const totalDebt = debtSummary.reduce((acc, debt) => acc + debt.amount, 0)
  const sign = totalDebt > 0 ? '+' : ''
  const symbol = totalDebt > 0 ? format.icons.positive : format.icons.negative
  await bot.sendMessage(
    update.chat.id,
    format.bold(`${format.icons.debt} Debt Summary`) +
      '\n\n' +
      message +
      '\n\n' +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `${symbol} <b>Total:</b> ${format.code(sign + totalDebt.toString())}`,
    update.message_id
  )
}
const getHistory = async (update: Telegram.Message) => {
  await connectDB()
  const author = await getUserByTelegramId([update.from.id])
  if (author.length === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.warning(
        'Not Registered',
        'You are not registered. Use /register to use the bot.'
      ),
      update.message_id
    )
  }
  const debts = await getDebts(author[0]._id, update.chat.id)
  if (debts.length === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.info('No History', 'No debt history found.'),
      update.message_id
    )
  }

  const message = debts
    .map((debt, idx) => {
      const isAuthor = debt.author._id === author[0]._id
      const partner = isAuthor ? debt.partner : debt.author
      const name = getDisplayName(partner)
      const displayAmount = isAuthor ? debt.amount : -debt.amount
      const sign = displayAmount > 0 ? '+' : ''
      const symbol =
        displayAmount > 0 ? format.icons.positive : format.icons.negative
      const date = debt.createdAt
        ? new Date(debt.createdAt)
            .toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
            .replace(/ /g, '-')
        : 'N/A'

      return (
        `${idx + 1}. ${symbol} ${format.bold(name)} → ${format.code(
          sign + displayAmount
        )}\n` + `   ${format.italic(debt.description)} | ${date}`
      )
    })
    .join('\n\n')

  await bot.sendMessage(
    update.chat.id,
    format.bold(`${format.icons.history} Debt History`) + '\n\n' + message,
    update.message_id
  )
}

const settleDebt = async (update: Telegram.Message) => {
  const result = validateSettleDebt(update.text, update.entities)

  if (!result) return
  const { userId, username } = result

  await connectDB()
  const [author, partner] = await Promise.all([
    getUserByTelegramId([update.from.id]),
    username ? getUserByUsername([username]) : getUserByTelegramId([userId]),
  ])
  if (author.length === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.warning(
        'Not Registered',
        'You are not registered. Use /register to use the bot.'
      ),
      update.message_id
    )
  }

  if (partner.length === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.warning(
        'User Not Found',
        `${format.bold(
          `@${username}` || 'The mentioned user'
        )} is not registered. Tell them to register using /register command`
      ),
      update.message_id
    )
  }

  if (partner[0]._id === author[0]._id) {
    return await bot.sendMessage(
      update.chat.id,
      format.warning(
        'Invalid Operation',
        'You cannot settle debt with yourself.'
      ),
      update.message_id
    )
  }

  const existingDebt = await getDebtBetweenUsers(
    author[0]._id,
    partner[0]._id,
    update.chat.id
  )

  if (existingDebt === 0) {
    return await bot.sendMessage(
      update.chat.id,
      format.info(
        'Already Settled',
        'Debts are already settled or no debts exist between you two in this group.'
      ),
      update.message_id
    )
  }

  await bot.sendMessage(
    update.chat.id,
    format.warning(
      'Settlement Request',
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `${format.bold(
          author[0].firstName
        )} wants to settle debts with ${format.bold(
          partner[0].firstName
        )}.\n\n` +
        `${format.italic(
          `${partner[0].firstName}, please confirm this settlement.`
        )}`
    ),
    update.message_id,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '✅ Confirm',
              callback_data: `settle_confirm:${author[0]._id}_${partner[0]._id}`,
            },
            {
              text: '❌ Cancel',
              callback_data: `settle_cancel:${author[0]._id}_${partner[0]._id}`,
            },
          ],
        ],
      },
    }
  )
}

const confirmSettle = async (callbackQuery: Telegram.CallbackQuery) => {
  if (!callbackQuery.data) return console.error('No data in callback query')
  const [action, ids] = callbackQuery.data.split(':')
  const [authorIdStr, partnerIdStr] = ids.split('_')
  await connectDB()
  const [author] = await getUserByTelegramId([Number(authorIdStr)])
  const [partner] = await getUserByTelegramId([Number(partnerIdStr)])
  if (action === 'settle_cancel') {
    const isAuthor = callbackQuery.from.id.toString() === authorIdStr
    const isPartner = callbackQuery.from.id.toString() === partnerIdStr
    if (!isAuthor && !isPartner) {
      return await bot.answerCallbackQuery(
        callbackQuery.id,
        'You are not authorized for this action.'
      )
    }
    await bot.answerCallbackQuery(callbackQuery.id, 'Settlement cancelled.')

    return await bot.editMessage(
      callbackQuery.message.chat.id,
      callbackQuery.message.message_id,
      format.warning(
        'Settlement Cancelled',
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
          `The settlement request has been cancelled by ${format.bold(
            getDisplayName(isAuthor ? author : partner)
          )}.`
      )
    )
  }
  if (action !== 'settle_confirm')
    return console.error('Invalid action in callback query')

  if (callbackQuery.from.id !== partner._id) {
    const displayName = getDisplayName(partner)
    return await bot.answerCallbackQuery(
      callbackQuery.id,
      `Only ${displayName} can confirm this settlement.`
    )
  }

  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      const chatId = callbackQuery.message.chat.id
      const existingAmount = await getDebtBetweenUsers(
        author._id,
        partner._id,
        chatId
      )

      if (existingAmount === 0) {
        return await bot.sendMessage(
          chatId,
          format.info(
            'Already Settled',
            'Debts are already settled or no debts exist between you two in this group.'
          ),
          callbackQuery.message.message_id
        )
      }

      await createDebt(
        {
          group: chatId,
          author: author._id,
          partner: partner._id,
          amount: -existingAmount,
          description: 'Settlement',
        },
        session
      )

      await adjustDebtWithPartner(
        author._id,
        partner._id,
        existingAmount,
        session
      )

      await bot.editMessage(
        callbackQuery.message.chat.id,
        callbackQuery.message.message_id,
        format.success(
          'Settlement Completed',
          `━━━━━━━━━━━━━━━━━━━━\n\n` +
            `Debts between ${format.bold(
              getDisplayName(author)
            )} and ${format.bold(
              getDisplayName(partner)
            )} have been settled successfully.`
        )
      )
    })
  } catch (err) {
    console.error('Error during settlement transaction:', err.message || err)
    await bot.sendMessage(
      callbackQuery.message.chat.id,
      format.error(
        'System Error',
        'An error occurred while processing the settlement. Please try again later.'
      ),
      callbackQuery.message.message_id
    )
  } finally {
    session.endSession()
    await bot.answerCallbackQuery(callbackQuery.id)
  }
}

export { addDebt, getDebt, getHistory, settleDebt, confirmSettle }
