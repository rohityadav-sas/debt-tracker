import { model, Schema } from 'mongoose'

const userSchema = new Schema<IUser>(
	{
		_id: {
			type: Number,
			required: true
		},
		username: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		totalDebt: [
			{
				partner: {
					type: Number,
					required: true
				},
				amount: {
					type: Number,
					required: true,
					default: 0
				}
			}
		]
	},
	{
		versionKey: false
	}
)

export default model('User', userSchema)
