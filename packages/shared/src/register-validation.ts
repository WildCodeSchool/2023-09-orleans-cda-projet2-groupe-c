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

export interface ValueType {
  id: number;
  order: number;
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
  .positive()
  .refine(
    (data) => {
      const age = new Date().getFullYear() - data;

      return age >= 18;
    },
    { message: 'ⓘ You must be 18 years old to register.' },
  )
  .refine(
    (data) => {
      const age = new Date().getFullYear() - data;

      return age <= 100;
    },
    {
      message: 'ⓘ You must be less than 100 years old to register.',
    },
  );

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

// Schema upload picture
export type PictureBody =
  | 'picture_1'
  | 'picture_2'
  | 'picture_3'
  | 'picture_4'
  | 'picture_5'
  | 'picture_6';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1mb
const ACCEPTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

const pictureSchema = z
  .any()
  .refine((files) => files?.length == 1, 'ⓘ Profile picture is required.')
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    `ⓘ Max file size is 1MB.`,
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.has(files?.[0]?.type),
    'ⓘ .jpg, .jpeg, .png and .webp files are accepted.',
  );

export const pictureBodySchema = z.object({
  picture_1: pictureSchema,
  picture_2: pictureSchema.optional(),
  picture_3: pictureSchema.optional(),
  picture_4: pictureSchema.optional(),
  picture_5: pictureSchema.optional(),
  picture_6: pictureSchema.optional(),
});

// Age pref Schema
const MIN_AGE = 18;
const MAX_AGE = 100;
export const minAgeSchema = z.number().int().min(MIN_AGE).max(MAX_AGE);
export const maxAgeSchema = z.number().int().min(MIN_AGE).max(MAX_AGE);

// Age pref Schema FrontEnd
export const formAgeSchema = z.object({
  minAge: minAgeSchema,
  maxAge: maxAgeSchema,
});

export type FormAgeBody = z.infer<typeof formAgeSchema>;
export const formPrefSchema = z.object({
  user_id: z.number(),
  genderPref: z.enum(['man', 'woman', 'non-binary'], {
    invalid_type_error: 'ⓘ Please select one of the options.',
  }),
  languagePrefId: z
    .string({ required_error: 'ⓘ This field is required.' })
    .trim()
    .regex(/^\d+$/)
    .or(
      z
        .number({
          required_error: 'This field is required.',
        })
        .int()
        .nonnegative(),
    ),
  distance: z
    .number({ required_error: 'This field is required.' })
    .int()
    .nonnegative(),
});

export const formGenderPrefSchema = formPrefSchema.pick({ genderPref: true });
export const formLanguagePrefSchema = formPrefSchema.pick({
  languagePrefId: true,
});
export const formDistancePrefSchema = formPrefSchema.pick({ distance: true });

//type for the pref gender form frontend
export type FormPrefGender = z.infer<typeof formGenderPrefSchema>;
//type for language pref form frontend
export type FormLanguagePref = z.infer<typeof formLanguagePrefSchema>;
//type for distance pref form frontend
export type FormDistancePref = z.infer<typeof formDistancePrefSchema>;
// Type for the birthdate form frontend
export type FormBirthdateBody = z.infer<typeof formBirthdateSchema>;

// FRONTEND VALIDATION
const pictureSchemaFrontend = z.object({
  picture_1: z.string(),
  picture_2: z.string().optional(),
  picture_3: z.string().optional(),
  picture_4: z.string().optional(),
  picture_5: z.string().optional(),
  picture_6: z.string().optional(),
});

// merge dates with the form schema to get the birthdate
export const formProfileSchema = formSchema
  .merge(formBirthdateSchema)
  .merge(formItemsSchema)
  .merge(formAgeSchema)
  .merge(pictureSchemaFrontend);

// Type for the birthdate form frontend
export type FormProfileBody = z.infer<typeof formProfileSchema>;

// BACKEND VALIDATION

// Schema without year, month and day with items and prefs
export const formProfileWithItemsSchemaBackend = formSchema
  .merge(formItemsSchema)
  .merge(formPrefSchema)
  .merge(formAgeSchema);

export type FormProfileBodyBackend = z.infer<
  typeof formProfileWithItemsSchemaBackend
>;
