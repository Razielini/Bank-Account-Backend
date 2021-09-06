import mongoose, { Document, Schema } from 'mongoose';
import functions from '../../../../functions';

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
  status: { type: Boolean, default: true },
});

userSchema.pre('save', async function (this: IUser, next: any) {
  const hash = await functions.bcrypt.hashPassword({ password: this.password });
  this.password = hash;
  next();
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUser>('User', userSchema, 'user');
