interface IUser {
	_id: number
	username?: string
	firstName?: string
	lastName?: string
}

interface IDebt {
	group: number
	author: number
	partner: number
	amount: number
	description: string
	createdAt?: Date
}
