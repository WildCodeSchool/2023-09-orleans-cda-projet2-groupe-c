import { z } from 'zod';

import { authSchema } from '.';

export const formShema = authSchema.omit({
  password: true,
  email: true,
  activate_at: true,
  activation_code: true,
});

export const formCategoryShema = z.object({
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
});

export const formBaseShema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.optional(z.string()),
});

/* export const formLanguageShema = z.object({
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
  }); */

export const formArrayNumbers = z.object({
  technologies: z.array(z.number()),
  languages: z.array(z.number()),
  hobbies: z.array(z.number()),
});

//form
export const formValidationShema = formShema.merge(formArrayNumbers);
export const formName = formShema.pick({ name: true });
export const formBirthDate = formShema.pick({ birthdate: true });
export const formIamShema = formShema.pick({ gender: true });
export const formCityShema = formShema.pick({ city_id: true });

export const formCategoryHobbySchema =
  formCategoryShema.merge(formHobbiesShema);
export const formBioShema = formShema.pick({ biography: true });
export const formGitShema = formShema.pick({ account_github: true });

export type ProfileForm = z.infer<typeof formValidationShema>;
export type FormNameValidation = z.infer<typeof formName>;
export type FormBirthDateValidation = z.infer<typeof formBirthDate>;
export type FormIamValidation = z.infer<typeof formIamShema>;
export type FormCityValidation = z.infer<typeof formCityShema>;
export type FormBaseValidation = z.infer<typeof formBaseShema>;

/* export type FormLanguageValidation = z.infer<typeof formLanguageShema>
export type FormTechnologyValidation = z.infer<typeof formTechnologieShema> */
export type FormCategoryValidation = z.infer<typeof formCategoryHobbySchema>;
export type FormHobbyValidation = z.infer<typeof formHobbiesShema>;
export type FormBioValidation = z.infer<typeof formBioShema>;
export type FormGitValidation = z.infer<typeof formGitShema>;
