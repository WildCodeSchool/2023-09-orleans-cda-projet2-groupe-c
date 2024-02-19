/* eslint-disable unicorn/no-null */
import type { Response } from 'express';

import { db } from '@app/backend-shared';
import type { Request as ExpressRequest } from '@app/shared';

interface Request extends ExpressRequest {
  isMatching?: boolean;
  user2?: number;
  receiversIds?: number[];
}

export const verifyInteractions = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const userId1 = req.userId as number;
    const receiversIds = [];

    const hoteActions = await db
      .selectFrom('user_action as ua')
      .select([
        'ua.id',
        'ua.initiator_id',
        'ua.liked_at',
        'ua.superlike_at',
        'ua.canceled_at',
        'ua.receiver_id',
      ])
      .where((eb) => eb('ua.initiator_id', '=', userId1))
      .where('ua.canceled_at', 'is not', null)
      .execute();

    for (const hoteAction of hoteActions) {
      const receiverId = hoteAction.receiver_id;

      const userAction = await db
        .selectFrom('user_action as ua')
        .innerJoin('user as u', 'ua.receiver_id', 'u.id')
        .select([
          'ua.id',
          'ua.initiator_id',
          'ua.receiver_id',
          'ua.liked_at',
          'ua.superlike_at',
          'ua.canceled_at',
        ])
        .where(({ eb, or, and }) =>
          and([
            eb('ua.initiator_id', '=', receiverId),
            eb('ua.canceled_at', 'is not', null),
            or([
              eb('ua.liked_at', 'is not', null),
              eb('ua.superlike_at', 'is not', null),
            ])
          ]),
        )
        .execute();

      if (Boolean(hoteAction) && Boolean(userAction)) {
        if (
          userAction[0].receiver_id === hoteAction.initiator_id &&
          hoteAction.receiver_id === userAction[0].initiator_id
        ) {
          req.isMatching = true;
          receiversIds.push(receiverId);
        } else {
          req.isMatching = false;
          return res.status(403).json({ success: false, isMatching: false });
        }
      }
    }
    req.receiversIds = receiversIds;
    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error !',
    });
  }
};
