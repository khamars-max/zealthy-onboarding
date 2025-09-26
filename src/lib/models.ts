import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    onboardingStep: { type: Number, default: 1 },
    aboutMe: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    birthDate: Date,
  },
  { timestamps: true }
);

const configSchema = new Schema(
  {
    step2: { type: [String], default: ['aboutMe'] },
    step3: { type: [String], default: ['address'] },
  },
  { timestamps: true }
);

export const User = models.User || model('User', userSchema);
export const Config = models.Config || model('Config', configSchema);

// import mongoose, { Schema, Model, Document } from 'mongoose';


// export interface IUser extends Document {
//   email: string;
//   password: string;          
//   step: number;           
//   aboutMe?: string;
//   birthDate?: Date;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     zip?: string;
//   };
// }


// const UserSchema = new Schema<IUser>(
//   {
//     email:    { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     step:     { type: Number, default: 1 },

//     aboutMe:   String,
//     birthDate: Date,
//     address: {
//       street: String,
//       city:   String,
//       state:  String,
//       zip:    String,
//     },
//   },
//   { timestamps: true }
// );


// export const UserModel: Model<IUser> =
//   mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
  
  