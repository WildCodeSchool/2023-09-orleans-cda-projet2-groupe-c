import express from 'express';

import { db } from '@app/backend-shared';
import {
  type Request as ExpressRequest,
  type Gender,
  type RequestPreferencesBody,
  type UserPreferenceId,
  requestPreferencesSchema,
} from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import preferences from '@/services/preferences';

interface Request extends ExpressRequest {
  userPreferenceId?: UserPreferenceId[];
  body: RequestPreferencesBody;
}

const filterRouter = express.Router();

filterRouter.get('/preferences', getUserId, async (req: Request, res) => {
  try {
    const userId = req.userId as number;

    const userPreferences = await preferences.getUserPreferences(userId);

    res.json(userPreferences);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fail to get the user preferences !',
      error,
    });
  }
});

// Update the user preferences
filterRouter.put('/preferences', getUserId, async (req: Request, res) => {
  try {
    // Get the user preference id from the request
    const userId = req.userId as number;

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
    await db
      .updateTable('preference')
      .set({
        distance: parsed.data.distance,
        language_pref_id: Number(parsed.data.language_pref_id),
        gender_pref: parsed.data.gender_pref as Gender,
        min_age: parsed.data.min_age,
        max_age: parsed.data.max_age,
      })
      .where('preference.user_id', '=', userId)
      .execute();

    res.status(200).json({
      success: true,
      message: 'Your preferences have been updated.',
    });

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
});

export default filterRouter;
