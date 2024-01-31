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

// Update the user preferences
filterRouter.put(
  '/:userId/preferences',
  getUserId,
  getUserPreferenceId,
  async (req: Request, res) => {
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
        .set(parsed.data)
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
  },
);

export default filterRouter;
