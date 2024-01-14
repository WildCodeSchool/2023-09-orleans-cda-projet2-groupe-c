import { z } from 'zod';

export interface UserPreferenceId {
  preference_id: number;
}

// Schema to validate the request body for updating preferences
export const requestPreferencesSchema = z.object({
  distance: z.number().int().nonnegative(),
  gender_pref: z.enum(['man', 'woman', 'non-binary']),
  language_pref_id: z.number().int().positive(),
});

export type RequestPreferencesBody = z.infer<typeof requestPreferencesSchema>;
