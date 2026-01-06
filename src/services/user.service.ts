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
