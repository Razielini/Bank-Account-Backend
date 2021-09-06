import config from 'config';
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../user';
import { IAccount } from '../account';

const typeTransfer: Array<string> = Object.values(config.get('interfaces.typeTransfer'));
const typeOperation: Array<string> = Object.values(config.get('interfaces.typeOperation'));
const typeStatus: Array<string> = Object.values(config.get('interfaces.typeStatus'));
const defaultTypeStatus: string = config.get('interfaces.defaultTypeStatus');

export interface ITransfer extends Document {
  user: IUser['_id']; // Usuario
  originAccount: IAccount['_id']; // Cuenta
  type: string; // Tipo de movimiento
  amount: number; // Monto
  destinationAccount: IAccount['_id']; // Cuenta destino
  concept: string; // Concepto
  reference: string; // Referencia
  operation: string; // Operación
  applyDate: Date; // Fecha aplicada
  status: string; // Estatus
}

const transferSchema: Schema = new Schema<ITransfer>({
  user: { type: Schema.Types.ObjectId, required: true },
  originAccount: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: typeTransfer, required: true },
  amount: { type: Number, required: true },
  destinationAccount: { type: Schema.Types.ObjectId, required: true },
  concept: { type: String },
  reference: { type: String },
  operation: { type: String, enum: typeOperation, required: true },
  status: { type: String, enum: typeStatus, required: true, default: defaultTypeStatus },
  applyDate: { type: Date },
});

export default mongoose.model<ITransfer>('Transfer', transferSchema, 'transfer');
