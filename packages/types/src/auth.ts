import { z } from 'zod';

export const userSchema = z
  .object({
    name: z
      .string({
        required_error: 'ⓘ Name is required.',
        invalid_type_error: 'ⓘ Name must be a string.',
      })
      .trim()
      .min(3, { message: 'ⓘ Name must be more than 3 characters.' })
      .max(255, { message: 'ⓘ Name must be less than 255 characters.' }),
    birthdate: z.date({ required_error: 'ⓘ Birthdate is required.' }).refine(
      (date) => {
        // Calculate user age for registration, user must be >= 18 years old
        const age = new Date().getFullYear() - date.getFullYear();

        return age >= 18;
      },
      { message: 'ⓘ You must be 18 years old to register.' },
    ),
    gender: z.enum(['male', 'female', 'non-binary']),
    biography: z.optional(
      z.string().trim().max(1000, {
        message: 'ⓘ Biography must be less than 1000 characters.',
      }),
    ),
    account_github: z.optional(
      z
        .string()
        .trim()
        .url({ message: 'ⓘ Your account Github must be a url valid.' })
        .max(255, {
          message: 'ⓘ Your account Github must be less than 255 characters.',
        }),
    ),
    role: z.enum(['user', 'admin']),
    email: z
      .string({
        required_error: 'ⓘ Email is required.',
        invalid_type_error: 'ⓘ Email must be a string.',
      })
      .trim()
      .email({ message: 'ⓘ Email must be a valid email.' })
      .max(255, { message: 'ⓘ Email must be less than 255 characters.' }),
    password: z
      .string({
        required_error: 'ⓘ Password is required.',
        invalid_type_error: 'ⓘ Password must be a string.',
      })
      .trim()
      .min(8, { message: 'ⓘ Password must be more than 8 characters.' })
      .max(255, { message: 'ⓘ Password must be less than 255 characters.' }),
    email_verified_at: z.date({
      required_error: 'ⓘ Email verified at is required.',
    }),
    activation_code: z
      .string({
        required_error: 'ⓘ Activation code is required.',
        invalid_type_error: 'ⓘ Activation code must be a string.',
      })
      .trim()
      .max(6, {
        message: 'ⓘ Activation code must be less than 255 characters.',
      }),
    activate_at: z.date({ required_error: 'ⓘ Activate at is required.' }),
    city_id: z
      .number({
        required_error: 'ⓘ City id is required.',
        invalid_type_error: 'ⓘ City id must be a number.',
      })
      .positive({ message: 'ⓘ City id must be a positive number.' })
      .nullable(),
  })
  .strict()
  .strip();

export const authSchema = userSchema.pick({
  email: true,
  password: true,
});

export const registerWithActivationCodeSchema = userSchema.pick({
  email: true,
  password: true,
  role: true,
  activation_code: true,
  email_verified_at: true,
});

export const activationCodeSchema = userSchema.pick({ activation_code: true });

export const activationTokenSchema = userSchema.pick({
  activation_code: true,
  activate_at: true,
});

export type RegisterBody = z.infer<typeof authSchema>;

export type RegisterWithActivationCode = z.infer<
  typeof registerWithActivationCodeSchema
>;

export type ActivationCode = z.infer<typeof activationCodeSchema>;

export type ActivationToken = z.infer<typeof activationTokenSchema>;
