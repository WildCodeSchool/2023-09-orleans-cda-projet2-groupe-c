import { z } from 'zod';

// Authentification validator
export const authSchema = z
  .object({
    email: z
      .string({
        required_error: 'ⓘ Email is required',
        invalid_type_error: 'ⓘ Email must be a string',
      })
      .trim()
      .toLowerCase()
      .email({ message: 'ⓘ Email must be a valid email' })
      .max(255, { message: 'ⓘ Email must be less than 255 characters' }),
    password: z
      .string({
        required_error: 'ⓘ Password is required',
        invalid_type_error: 'ⓘ Password must be a string',
      })
      .trim()
      .toLowerCase()
      .min(8, { message: 'ⓘ Password must be more than 8 characters' })
      .max(255, { message: 'ⓘ Password must be less than 255 characters' }),
  })
  .required() // properties are required by default
  .strict() // no additional properties allowed
  .strip(); // remove additional properties

export type AuthBody = z.infer<typeof authSchema>;

export const registerSchema = authSchema.extend({
  role: z.enum(['user', 'admin']),
  activation_code: z.string().max(6),
  // activation_code: z.date(),
  email_verified_at: z.date(),
});

export type RegisterBody = z.infer<typeof registerSchema>;
