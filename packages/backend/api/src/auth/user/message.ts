import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const messageRouter = express.Router();

messageRouter.get('/:userId/messages', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    const conversation = await db
      .selectFrom('message as m')
      .innerJoin('user as u', 'm.sender_id', 'u.id')
      .innerJoin('user_action as ua', 'm.conversation_id', 'ua.id')
      .whereRef('m.sender_id', '=', 'u.id')
      .select((eb) => [
        'm.conversation_id',
        jsonArrayFrom(
          eb
            .selectFrom('user as u')
            .innerJoin('picture as p', 'p.user_id', 'u.id')
            .select(['u.id', 'u.name as sender_name', 'p.picture_path'])
            .whereRef('u.id', '=', 'm.sender_id')
            .orderBy('p.id', 'asc')
            .limit(1),
        ).as('sender'),
        jsonArrayFrom(
          eb
            .selectFrom('user_action as ua')
            .innerJoin('user as u', 'ua.receiver_id', 'u.id')
            .innerJoin('picture as p', 'p.user_id', 'u.id')
            .select(['u.id', 'u.name as receiver_name', 'p.picture_path'])
            .whereRef('m.conversation_id', '=', 'ua.id')
            .orderBy('p.id', 'asc')
            .limit(1),
        ).as('receiver'),
        jsonArrayFrom(
          eb
            .selectFrom('message as m')
            .innerJoin('user as u', 'm.sender_id', 'u.id')
            .whereRef('m.conversation_id', '=', 'ua.id')
            .select(['m.id', 'u.name as sender_name', 'm.content', 'm.sent_at'])
            .orderBy('m.sent_at', 'desc')
            .limit(1),
        ).as('messages'),
      ])
      .where('sender_id', '=', userId)
      .groupBy('m.conversation_id')
      .execute();

    return res.json(conversation);
  } catch (error) {
    throw new Error(`Fail to get messages : ${String(error)}`);
  }
});

messageRouter.get('/:userId/messages/:conversationId', async (req, res) => {
  try {
    const conversationId = Number.parseInt(req.params.conversationId);

    const messages = await db
      .selectFrom('message as m')
      .innerJoin('user as u', 'm.sender_id', 'u.id')
      .select(['m.id', 'u.name as sender_name', 'm.content', 'm.sent_at'])
      .where('m.conversation_id', '=', conversationId)
      .orderBy('m.sent_at', 'desc')
      .execute();

    return res.json(messages);
  } catch (error) {
    throw new Error(`Fail to get messages : ${String(error)}`);
  }
});

export default messageRouter;
