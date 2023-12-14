import { z } from 'zod';

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

export const activationCodeSchema = authSchema
  .extend({
    activation_code: z
      .string({
        required_error: 'ⓘ Activation code is required',
        invalid_type_error: 'ⓘ Activation code must be a string',
      })
      .trim()
      .toUpperCase()
      .max(6, { message: 'ⓘ Activation code must be 6 characters' })
      .min(6, { message: 'ⓘ Activation code must be 6 characters' }),
    email_verified_at: z.date({
      required_error: 'ⓘ Email verified at is required',
      invalid_type_error: 'ⓘ Email verified at must be a date',
    }),
  })
  .required()
  .strict()
  .strip();

export type ActivationCode = z.infer<typeof activationCodeSchema>;
export type RegisterBody = z.infer<typeof authSchema>;
