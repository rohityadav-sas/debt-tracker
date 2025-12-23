import 'dotenv/config'

const getEnv = (key: string) => {
	const value = process.env[key]
	if (!value) throw new Error(`Missing environment variable: ${key}`)
	return value
}

const ENV = {
	BOT_TOKEN: getEnv('BOT_TOKEN'),
	MONGODB_URI: getEnv('MONGODB_URI')
}

export default ENV
