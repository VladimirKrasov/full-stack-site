import { Document, Schema, Types, model } from 'mongoose'


export interface IUser extends Document {
  email: string
  password: string
  links?: string[]
}

export const UserSchema = new Schema ({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
})

export const userModel = model('User', UserSchema)