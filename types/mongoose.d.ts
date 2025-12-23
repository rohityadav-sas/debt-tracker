interface IUser {
	_id: number
	username?: string
	firstName?: string
	lastName?: string
	totalDebt?: {
		partner: number
		amount: number
	}[]
}

interface IDebt {
	group: number
	author: number
	partner: number
	amount: number
	description: string
	createdAt?: Date
}
