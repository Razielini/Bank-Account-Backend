import mongoose, { Document, Schema } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  lastName: string;
  phone: string;
  rfc: string;
  address: string;
}

const personSchema: Schema = new Schema<IPerson>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  rfc: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

export default mongoose.model<IPerson>('Person', personSchema, 'person');
