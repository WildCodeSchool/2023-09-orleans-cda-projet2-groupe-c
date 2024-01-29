import { z } from 'zod';

export interface UserPreferenceId {
  preference_id: number;
}

// Schema to validate the request body for updating preferences
export const requestPreferencesSchema = z.object({
  distance: z.number().int().nonnegative().nullable().optional(),
  gender_pref: z.enum(['man', 'woman', 'non-binary']).nullable().optional(),
  // language_pref_id: z.number().int().positive().optional(),
  language_pref_id: z.string().trim().regex(/^\d+$/).nullable().optional(),
});

export type RequestPreferencesBody = z.infer<typeof requestPreferencesSchema>;
