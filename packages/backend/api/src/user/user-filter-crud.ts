import express from 'express';

import { db } from '@app/backend-shared';
import type {
  Request as ExpressRequest,
  RequestBody,
  UserPreferenceId,
} from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { getUserPreferenceId } from '@/middlewares/filter-handlers';

interface Request extends ExpressRequest {
  userPreferenceId?: UserPreferenceId[];
  body: RequestBody;
}

const filterRouter = express.Router();

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
      const distance = req.body.distance;
      const genderPref = req.body.genderPref;
      const languagePref = req.body.languagePref;

      // Update the preference table with the new values
      if (userPreferenceId) {
        await db
          .updateTable('preference')
          .set({
            distance: distance,
            gender_pref: genderPref,
            language_pref_id: languagePref,
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
        error: 'User preference not found!',
      });
    } catch {
      res.status(500).json({
        success: false,
        error: 'Fail to update your preference!',
      });
    }
  },
);

export default filterRouter;
