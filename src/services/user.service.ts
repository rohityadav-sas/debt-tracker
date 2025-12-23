import { ClientSession } from 'mongoose'
import User from '../models/user.model.js'

export const getUserByUsername = async (username: string[]) =>
  User.find({ username: { $in: username } }).lean()

export const getUserByTelegramId = async (ids: number[]) =>
  User.find({ _id: { $in: ids } }).lean()

export const upsertUser = async (userData: IUser) =>
  User.updateOne(
    {
      _id: userData._id,
    },
    userData,
    { upsert: true }
  )

export const getUserByPartner = async (authorId: number, partnerId: number) =>
  User.findOne({
    _id: authorId,
    'totalDebt.partner': partnerId,
  })

export const adjustDebtWithPartner = async (
  authorId: number,
  partnerId: number,
  amount: number,
  session?: ClientSession
) =>
  User.bulkWrite(
    [
      {
        updateOne: {
          filter: { _id: authorId, 'totalDebt.partner': partnerId },
          update: { $inc: { 'totalDebt.$.amount': -amount } },
        },
      },
      {
        updateOne: {
          filter: { _id: partnerId, 'totalDebt.partner': authorId },
          update: { $inc: { 'totalDebt.$.amount': amount } },
        },
      },
    ],
    { session }
  )
