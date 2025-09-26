import { z } from 'zod';

export const signupSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

export const page2Schema = z.object({
  aboutMe:   z.string().max(500).optional(),
  birthDate: z.coerce.date().optional(),
  address: z
    .object({
      street: z.string(),
      city:   z.string(),
      state:  z.string(),
      zip:    z.string(),
    })
    .partial()
    .optional(),
});
