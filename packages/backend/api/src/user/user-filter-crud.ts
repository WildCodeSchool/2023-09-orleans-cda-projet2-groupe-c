import express from 'express';

import { db } from '@app/backend-shared';
import {
  type Request as ExpressRequest,
  type RequestPreferencesBody,
  type UserPreferenceId,
  requestPreferencesSchema,
} from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { getUserPreferenceId } from '@/middlewares/filter-handlers';

interface Request extends ExpressRequest {
  userPreferenceId?: UserPreferenceId[];
  body: RequestPreferencesBody;
}

const filterRouter = express.Router();

filterRouter.get(
  '/:userId/preferences',
  getUserId,
  getUserPreferenceId,
  async (req: Request, res) => {
    try {
      const userId = req.userId as number;

      if (!req.userPreferenceId) {
        throw new Error('User preference ID is not defined');
      }

      const userPreferenceId = req.userPreferenceId[0].preference_id;

      const preferences = await db
        .selectFrom('preference as pref')
        .innerJoin('user as u', 'u.preference_id', 'pref.id')
        .select([
          'u.name',
          'pref.id as preference_id',
          'pref.distance',
          'pref.language_pref_id',
          'pref.gender_pref',
        ])
        .where('u.id', '=', userId)
        .where('u.preference_id', '=', userPreferenceId)
        .execute();

      res.json(preferences);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Fail to update your preference!',
        error,
      });
    }
  },
);

// Update the user preferences
filterRouter.put(
  '/:userId/preferences',
  getUserId,
  getUserPreferenceId,
  async (req: Request, res) => {
    try {
      // Get the user preference id from the request
      const userPreferenceId = req.userPreferenceId;

      // Get the body from the request
      // Use parse from zod to validate the request body
      const parsed = requestPreferencesSchema.safeParse(req.body);

      // If one of the property values is incorrect, returns an error
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: parsed.error.message,
        });
      }

      // Update the preference table with the new values
      if (userPreferenceId) {
        await db
          .updateTable('preference')
          .set({
            gender_pref:
              parsed.data.gender_pref === null
                ? undefined
                : parsed.data.gender_pref,
            language_pref_id:
              parsed.data.language_pref_id === null
                ? undefined
                : Number(parsed.data.language_pref_id),
            distance: Number(parsed.data.distance),
          })
          .where('preference.id', '=', userPreferenceId[0].preference_id)
          .execute();

        res.status(200).json({
          success: true,
          message: 'Your preferences have been updated.',
        });
      }

      res.status(404).json({
        success: false,
        error: 'User preferences not found!',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Fail to update your preference!',
        error,
      });
    }
  },
);

export default filterRouter;
