import { z } from 'zod';

import { authSchema } from '.';

export const formSchema = authSchema.omit({
  password: true,
  email: true,
  activate_at: true,
  activation_code: true,
  email_verified_at: true,
  role: true,
});

export interface CategoryHobby {
  category_name: string;
  logo_path: string;
  hobbies: {
    hobby_id: number;
    hobby_name: string;
  }[];
}

/* export const formCategoryShema = z.object({
  id: z.number(),
  category_name: z.string(),
  logo_path: z.optional(z.string()),
});

export const formHobbiesShema = z.object({
  hobbies: z.array(
    z.object({
      hobby_id: z.number().positive(),
      hobby_name: z.string(),
    }),
  ),
}); */

export const formHobbiesChooseShema = z.object({
  hobbies: z
    .array(z.string(), { invalid_type_error: 'ⓘ Select at least one hobby' })
    .nonempty({ message: 'ⓘ Select at least one hobby' })
    .max(6, { message: 'ⓘ You can select up to 6 hobbies' }),
});

export const formBaseShema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.optional(z.string()),
});

export const formLanguageShema = z.object({
  languages: z.array(
    z.object({
      id: z.number(),
      order: z.number(),
    }),
  ),
});

export const formTechnologieShema = z.object({
  technologies: z.array(
    z.object({
      id: z.number(),
      order: z.number(),
    }),
  ),
});

export const formArrayNumbers = z.object({
  technologies: z.array(z.number()),
  languages: z.array(z.number()),
  hobbies: z.array(z.number()),
});

export const formCityShema = z.object({
  cityId: z.number({ required_error: 'ⓘ City is required.' }),
  cityName: z.string({ required_error: 'ⓘ City Name is required.' }),
});

//test
export const formBackShema = z
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
    birthdate: z.date().refine(
      (date) => {
        // Calculate user age for registration, user must be >= 18 years old
        const age = new Date().getFullYear() - date.getFullYear();

        return age >= 18;
      },
      { message: 'ⓘ You must be 18 years old to register.' },
    ),
    gender: z.enum(['man', 'woman', 'non-binary', ''], {
      invalid_type_error: 'ⓘ Please select one of the options',
    }),

    biography: z.optional(
      z
        .string()
        .trim()
        .max(1000, {
          message: 'ⓘ Biography must be less than 1000 characters.',
        })
        .regex(
          new RegExp(/^[A-Za-z]+['s-]?[ A-Za-z]+$/),
          'ⓘ Biography should contain only alphabets',
        ),
    ),
    accountGithub: z.optional(
      z
        .string()
        .trim()
        .max(255, {
          message: 'ⓘ Your account Github must be less than 255 characters.',
        })
        .or(z.string().url()),
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
      .positive({ message: 'ⓘ City id must be a positive number.' }),
  })
  .merge(formArrayNumbers);

//form
export const formValidationShema = formSchema.merge(formArrayNumbers);
export const formNameSchema = formSchema.pick({ name: true });
export const formBirthDateSchema = formSchema.pick({ birthdate: true });
export const formIamSchema = formSchema.pick({ gender: true });

/* export const formCategoryHobbySchema =
 formHobbiesShema; */

export const formBioSchema = formSchema.pick({ biography: true });
export const formGitSchema = formSchema.pick({ account_github: true });

export type ProfileForm = z.infer<typeof formValidationShema>;
export type FormNameValidation = z.infer<typeof formNameSchema>;
export type FormBirthDateValidation = z.infer<typeof formBirthDateSchema>;
export type FormIamValidation = z.infer<typeof formIamSchema>;
export type FormCityValidation = z.infer<typeof formCityShema>;
export interface CityBody {
  id: number;
  name: string;
}

export type FormBaseValidation = z.infer<typeof formBaseShema>;

/* export type FormLanguageValidation = z.infer<typeof formLanguageShema>
export type FormTechnologyValidation = z.infer<typeof formTechnologieShema> */
export type FormCategoryValidation = z.infer<typeof formHobbiesChooseShema>;

export type FormBioValidation = z.infer<typeof formBioSchema>;
export type FormGitValidation = z.infer<typeof formGitSchema>;

//test
export type FormBackValidation = z.infer<typeof formBackShema>;
