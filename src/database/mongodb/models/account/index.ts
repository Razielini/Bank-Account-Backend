import mongoose, { Document, Schema } from 'mongoose';
import config from 'config';
import { IPerson } from '../person';
import functions from '../../../../functions';

export interface IAccount extends Document {
  numberAccount: string; // Número de cuenta
  product: string; // producto
  balance: number; // saldo
  status: boolean; // estado
  nip: string; // nip
  person: IPerson['_id']; // Persona
}

const products: Array<string> = Object.values(config.get('interfaces.typeProducts'));

const accountSchema: Schema = new Schema<IAccount>({
  numberAccount: { type: String, unique: true },
  product: {
    type: String,
    enum: products,
    required: true,
    validate: {
      validator: (val: any) => {
        return products.includes(val);
      },
      message: 'The value has an invalid format',
    },
  },
  balance: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  nip: { type: String },
  person: { type: Schema.Types.ObjectId, required: true },
});

accountSchema.pre('save', async function (this: IAccount, next: any) {
  this.numberAccount = functions.generic.generate.accountNumber();
  if (!this.nip) this.nip = functions.generic.generate.nip();
  next();
});

export default mongoose.model<IAccount>('Account', accountSchema, 'account');
