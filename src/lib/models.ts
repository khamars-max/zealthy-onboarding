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
