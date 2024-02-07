import { z } from 'zod';

export const authSchema = z
  .object({
    name: z
      .string({
        required_error: 'ⓘ Name is required.',
        invalid_type_error: 'ⓘ Name must be a string.',
      })
      .trim()
      .min(3, { message: 'ⓘ Name must be more than 3 characters.' })
      .max(255, { message: 'ⓘ Name must be less than 255 characters.' })
      .regex(
        new RegExp(/^[A-Za-z]+['s-]?[ A-Za-z]+$/),
        'ⓘ Name should contain only alphabets',
      ),
    birthdate: z
      .date()
      .refine(
        (date) => {
          // Calculate user age for registration, user must be >= 18 years old
          const age = new Date().getFullYear() - date.getFullYear();

          return age >= 18;
        },
        { message: 'ⓘ You must be 18 years old to register.' },
      )
      .refine(
        (date) => {
          const age = new Date().getFullYear() - date.getFullYear();

          return age <= 100;
        },
        {
          message: 'ⓘ You must be less than 100 years old to register.',
        },
      ),
    gender: z.enum(['man', 'woman', 'non-binary'], {
      invalid_type_error: 'ⓘ Please select one of the options.',
    }),

    biography: z.optional(
      z
        .string()
        .trim()
        .max(1000, {
          message: 'ⓘ Biography must be less than 1000 characters.',
        })
        .optional(),
    ),
    accountGithub: z.optional(
      z
        .string()
        .refine(
          (value) => {
            if (value.trim() === '') {
              return true;
            }
            try {
              new URL(value);
              return true;
            } catch {
              return false;
            }
          },
          {
            message: 'ⓘ Please enter a valid url.',
          },
        )
        .nullable(),
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
      .min(6, { message: 'ⓘ Activation code must be more than 6 characters.' })
      .max(6, {
        message: 'ⓘ Activation code must be less than 255 characters.',
      }),
    activate_at: z.date({ required_error: 'ⓘ Activate at is required.' }),
    cityId: z
      .number({
        required_error: 'ⓘ City id is required.',
        invalid_type_error: 'ⓘ City id must be a number.',
      })
      .positive({ message: 'ⓘ City id must be a positive number.' })
      .nullable(),
  })
  .strict()
  .strip();

export const registrationSchema = authSchema.pick({
  email: true,
  password: true,
});

export const registerWithActivationCodeSchema = authSchema.pick({
  email: true,
  password: true,
  role: true,
  activation_code: true,
  email_verified_at: true,
});

export const activationCodeSchema = authSchema.pick({ activation_code: true });

export const activationTokenSchema = authSchema.pick({
  activation_code: true,
  activate_at: true,
});

export type RegisterBody = z.infer<typeof registrationSchema>;

export type RegisterWithActivationCode = z.infer<
  typeof registerWithActivationCodeSchema
>;

export type ActivationCode = z.infer<typeof activationCodeSchema>;

export type ActivationToken = z.infer<typeof activationTokenSchema>;
export const loginSchema = authSchema.pick({ email: true, password: true });
export type AuthBody = z.infer<typeof loginSchema>;
