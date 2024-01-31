import { z } from 'zod';

import { authSchema } from '.';

export interface CategoryHobby extends FormItemsBodyValidation {
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

export type SelectedItemBody = {
  id: number;
  order: number;
};

export const formSchema = authSchema.omit({
  password: true,
  email: true,
  activate_at: true,
  activation_code: true,
  email_verified_at: true,
});

export const formArrayStringSchema = z.object({
  technologies: z
    .array(
      z.object({
        id: z.number().positive(),
        order: z.number().positive(),
      }),
      {
        invalid_type_error: 'ⓘ Select at least one technology.',
      },
    )
    .nonempty({ message: 'ⓘ Select at least one technology.' }),
  languages: z
    .array(
      z.object({
        id: z.number().positive(),
        order: z.number().positive(),
      }),
      {
        invalid_type_error: 'ⓘ Select at least one language.',
      },
    )
    .nonempty({ message: 'ⓘ Select at least one language.' }),
  hobbies: z
    .array(z.string(), { invalid_type_error: 'ⓘ Select at least one hobby.' })
    .nonempty({ message: 'ⓘ Select at least one hobby.' }),
});

export const formItemsSchema = z.object({
  languages: z.array(
    z.object({
      id: z.number().positive(),
      order: z.number().positive(),
    }),
  ),
  technologies: z.array(
    z.object({
      id: z.number().positive(),
      order: z.number().positive(),
    }),
  ),
  hobbies: z.array(
    z.object({
      id: z.number().positive(),
      order: z.number().positive(),
    }),
  ),
});

export const formValidationSchema = formSchema.merge(formArrayStringSchema);
export const formNameSchema = formSchema.pick({ name: true });
export const formBirthDateSchema = formSchema.pick({ birthdate: true });
export const formIamSchema = formSchema.pick({ gender: true });

export const formCityShema = z.object({
  cityId: z.number({ required_error: 'ⓘ City is required.' }),
  cityName: z.string(),
});

export const formLanguageAndTechnologySchema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.optional(z.string()),
});

export const formBioSchema = formSchema.pick({ biography: true });
export const formGitSchema = formSchema.pick({ accountGithub: true });
export const formBackShema = formSchema.merge(formItemsSchema);

export type ProfileForm = z.infer<typeof formValidationSchema>;
export type FormNameValidation = z.infer<typeof formNameSchema>;
export type FormBirthDateValidation = z.infer<typeof formBirthDateSchema>;
export type FormIamValidation = z.infer<typeof formIamSchema>;
export type FormCityValidation = z.infer<typeof formCityShema>;
export type FormItemsBodyValidation = z.infer<
  typeof formLanguageAndTechnologySchema
>;
export type FormItemsValidation = z.infer<typeof formItemsSchema>;
export type FormCategoryValidation = z.infer<typeof formItemsSchema>;
export type FormBioValidation = z.infer<typeof formBioSchema>;
export type FormGitValidation = z.infer<typeof formGitSchema>;
export type FormBackValidation = z.infer<typeof formBackShema>;
