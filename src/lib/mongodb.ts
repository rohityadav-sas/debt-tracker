import mongoose from 'mongoose'
import ENV from '../config/env.js'

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null, promise: null }

export default async function connectDB() {
	if (cached.conn) return cached.conn
	if (!cached.promise) {
		cached.promise = mongoose.connect(ENV.MONGODB_URI, {
			dbName: 'track-my-debt'
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}
