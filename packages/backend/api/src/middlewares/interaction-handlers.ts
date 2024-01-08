import type { Response } from 'express';

import { db } from '@app/backend-shared';
import type { Request as ExpressRequest } from '@app/shared';

interface Request extends ExpressRequest {
  superLikesCount?: number;
}

// Function to get superlikes count
const superLikeCount = async (userId: number): Promise<number> => {
  // Create a new date object and get the current date
  const currentDate = new Date();

  // Set time to 00:00:00:00
  currentDate.setHours(0, 0, 0, 0);

  // Create a new date object for the next date
  const nextDate = new Date(currentDate);

  // Get the current day + 1 and set the next date
  nextDate.setDate(nextDate.getDate() + 1);

  // Select all superlikes from the user between the current date and the next date
  const superLikesCount = await db
    .selectFrom('user_action')
    .select((eb) => eb.fn.countAll<number>().as('superlike_count'))
    .where('initiator_id', '=', userId)
    // Filter superlikes's date with "WHERE...AND WHERE" clause and compare if the date is between the current date and the next date
    .where('superlike_at', '>=', currentDate)
    .where('superlike_at', '<', nextDate)
    .execute();

  // By default, superliker count is 5, for each superlike post, decrement the counter
  // Reset the counter to 5 when the date has changed
  let superLikesCounter = 5 - superLikesCount[0].superlike_count;

  // Make sure the counter is between 0 and 5
  superLikesCounter = Math.max(0, Math.min(5, superLikesCounter));

  return superLikesCounter;
};

export const getSuperLikeCount = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const userId = req.userId;

    if (userId === undefined) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized!',
      });
    }

    const superLikesCount = await superLikeCount(userId);
    req.superLikesCount = Number(superLikesCount); // Convert superLikesCount to a number

    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};
