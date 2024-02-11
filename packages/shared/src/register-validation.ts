import { z } from 'zod';

import { authSchema } from './auth';

// Base schema
export const formSchema = authSchema.omit({
  password: true,
  email: true,
  role: true,
  activate_at: true,
  activation_code: true,
  email_verified_at: true,
});

// Hobby type
export interface HobbyBody {
  category_name: string;
  logo_path: string;
  hobbies: [
    {
      hobby_id: number;
      hobby_name: string;
    },
  ];
}

// City
export const formCityShema = z.object({
  cityId: z.number({ required_error: 'ⓘ City is required.' }),
  cityName: z.string(),
});

export type FormCityValidation = z.infer<typeof formCityShema>;

// Items schema
export const formItemsSchema = z.object({
  technologies: z.array(
    z.object({
      id: z.number({
        required_error: 'ⓘ Select at least one technology.',
        invalid_type_error: 'ⓘ Select at least one technology.',
      }),
      order: z.number(),
    }),
  ),
  languages: z.array(
    z.object({
      id: z.number({
        required_error: 'ⓘ Select at least one language.',
        invalid_type_error: 'ⓘ Select at least one language.',
      }),
      order: z.number(),
    }),
  ),
  hobbies: z.array(
    z.object({
      id: z.number({
        required_error: 'ⓘ Select at least one hobby.',
        invalid_type_error: 'ⓘ Select at least one hobby.',
      }),
      order: z.number(),
    }),
  ),
});

export type FormItemsValidation = z.infer<typeof formItemsSchema>;

// User name
export const formNameSchema = formSchema.pick({ name: true });
export type FormNameValidation = z.infer<typeof formNameSchema>;

// User gender
export const formIamSchema = formSchema.pick({ gender: true });
export type FormIamValidation = z.infer<typeof formIamSchema>;

// User biography
export const formBioSchema = formSchema.pick({ biography: true });
export type FormBioValidation = z.infer<typeof formBioSchema>;

// User github
export const formGitSchema = formSchema.pick({ accountGithub: true });
export type FormGitValidation = z.infer<typeof formGitSchema>;

// Schema for the birthdate
export const yearSchema = z
  .number({
    required_error: 'ⓘ Year is required.',
    invalid_type_error: 'ⓘ Year must be a number.',
  })
  .int()
  .positive();

export const monthSchema = z
  .number({
    required_error: 'ⓘ Month is required.',
    invalid_type_error: 'ⓘ Month must be a number.',
  })
  .int()
  .min(1)
  .max(12)
  .positive();

export const daySchema = z
  .number({
    required_error: 'ⓘ Day is required.',
    invalid_type_error: 'ⓘ Day must be a number.',
  })
  .int()
  .min(1)
  .max(31)
  .positive();

export const formBirthdateSchema = z
  .object({
    year: yearSchema,
    month: monthSchema,
    day: daySchema,
  })
  .required();

// Type for the birthdate form frontend
export type FormBirthdateBody = z.infer<typeof formBirthdateSchema>;

// FRONTEND VALIDATION

// merge dates with the form schema to get the birthdate
export const formProfileWithDateSchema = formSchema.merge(formBirthdateSchema);

// merge items with the form schema to oget technologies, languages and hobbies
export const formProfileWithDateAndItemsSchema =
  formProfileWithDateSchema.merge(formItemsSchema);
// Type for the birthdate form frontend
export type FormProfileBody = z.infer<typeof formProfileWithDateAndItemsSchema>;

// BACKEND VALIDATION

// Schema without year, month and day with items
export const formProfileWithItemsSchemaBackend =
  formSchema.merge(formItemsSchema);
export type FormProfileBodyBackend = z.infer<
  typeof formProfileWithItemsSchemaBackend
>;
