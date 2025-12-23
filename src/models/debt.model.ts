import { model, Schema } from 'mongoose'

const debtSchema = new Schema<IDebt>(
	{
		group: {
			type: Number,
			required: true
		},
		author: {
			type: Number,
			ref: 'User',
			required: true
		},
		partner: {
			type: Number,
			ref: 'User',
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		versionKey: false
	}
)

debtSchema.index({ group: 1, author: 1, partner: 1 })

export default model('Debt', debtSchema)
