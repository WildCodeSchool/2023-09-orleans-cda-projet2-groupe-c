import { z } from 'zod';

import { authSchema } from '.';

export interface CategoryHobby {
  category_name: string;
  logo_path: string;
  hobbies: {
    hobby_id: number;
    hobby_name: string;
  }[];
}

export interface CityBody {
  id: number;
  name: string;
}

export const formSchema = authSchema.omit({
  password: true,
  email: true,
  activate_at: true,
  activation_code: true,
  email_verified_at: true,
});

export const formBaseShema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.optional(z.string()),
});

export const formArrayNumbers = z.object({
  technologies: z.array(z.number()),
  languages: z.array(z.number()),
  hobbies: z.array(z.number()),
});

export const formHobbiesChooseShema = z.object({
  hobbies: z
    .array(z.string(), { invalid_type_error: 'ⓘ Select at least one hobby' })
    .nonempty({ message: 'ⓘ Select at least one hobby' })
    .max(6, { message: 'ⓘ You can select up to 6 hobbies' }),
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

export const formHobbiesShema = z.object({
  hobbies: z.array(
    z.object({
      id: z.number(),
      order: z.number(),
    }),
  ),
});

//form
export const formBackShema = formSchema
  .merge(formLanguageShema)
  .merge(formTechnologieShema)
  .merge(formHobbiesShema);
export const formValidationShema = formSchema.merge(formArrayNumbers);
export const formNameSchema = formSchema.pick({ name: true });
export const formBirthDateSchema = formSchema.pick({ birthdate: true });
export const formIamSchema = formSchema.pick({ gender: true });
export const formCityShema = z.object({
  cityId: z.number({ required_error: 'ⓘ City is required.' }),
  cityName: z.string({ required_error: 'ⓘ City Name is required.' }),
});
export const formBioSchema = formSchema.pick({ biography: true });
export const formGitSchema = formSchema.pick({ accountGithub: true });

export type ProfileForm = z.infer<typeof formValidationShema>;
export type FormNameValidation = z.infer<typeof formNameSchema>;
export type FormBirthDateValidation = z.infer<typeof formBirthDateSchema>;
export type FormIamValidation = z.infer<typeof formIamSchema>;
export type FormCityValidation = z.infer<typeof formCityShema>;
export type FormBaseValidation = z.infer<typeof formBaseShema>;
export type FormCategoryValidation = z.infer<typeof formHobbiesChooseShema>;
export type FormBioValidation = z.infer<typeof formBioSchema>;
export type FormGitValidation = z.infer<typeof formGitSchema>;
export type FormBackValidation = z.infer<typeof formBackShema>;
