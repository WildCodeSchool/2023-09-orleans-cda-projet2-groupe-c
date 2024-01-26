/* eslint-disable unicorn/no-null */
import type { Response } from 'express';

import { db } from '@app/backend-shared';
import type { Request } from '@app/shared';

export const verifyConversation = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const { conversationId } = req.params;

    const userId1 = req.userId as number;

    const userId2 = await db
      .selectFrom('message as m')
      .innerJoin('user_action as ua', 'm.conversation_id', 'ua.id')
      .innerJoin('user as receiver', 'ua.receiver_id', 'receiver.id')
      .select('receiver.id')
      .where('m.conversation_id', '=', Number(conversationId))
      .limit(1)
      .execute();

    if (userId2.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found',
      });
    }

    const initiatorAction = await db
      .selectFrom('user_action as ua')
      .select([
        'ua.id',
        'ua.initiator_id',
        'ua.liked_at',
        'ua.superlike_at',
        'ua.canceled_at',
      ])
      .where('ua.initiator_id', '=', userId1)
      .where('ua.receiver_id', '=', userId2[0].id)
      .where('ua.canceled_at', 'is not', null)
      .execute();

    const receiverAction = await db
      .selectFrom('user_action as ua')
      .select([
        'ua.id',
        'ua.initiator_id',
        'ua.liked_at',
        'ua.superlike_at',
        'ua.canceled_at',
      ])
      .where('ua.receiver_id', '=', userId1)
      .where('ua.initiator_id', '=', userId2[0].id)
      .where('ua.canceled_at', 'is not', null)
      .execute();

    if (initiatorAction.length > 0 && receiverAction.length > 0) {
      if (
        Boolean(initiatorAction[0].liked_at) ||
        (Boolean(initiatorAction[0].superlike_at) &&
          Boolean(receiverAction[0].liked_at)) ||
        Boolean(receiverAction[0].superlike_at)
      )
        res.status(200).json({ success: true, isMatching: true });
      next();
    } else {
      return res.status(403).json({ success: false, isMatching: false });
    }
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error !',
    });
  }
};
