import mongoose, { Document, Schema } from 'mongoose';
import { IPerson } from '../person';

export interface IUser extends Document {
  email: string; // Nombre de usuario
  password: string; // Contraseña
  sessionActive: boolean; // Inicio de sesión
  token: string; // Token
  status: boolean; // Estatus
}

const userSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessionActive: { type: Boolean, default: false },
  token: { type: String },
  status: { type: Boolean, default: false },
});

export default mongoose.model<IUser>('User', userSchema, 'user');
