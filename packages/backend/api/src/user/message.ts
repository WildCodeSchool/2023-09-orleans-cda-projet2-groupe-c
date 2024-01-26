import express from 'express';
import { jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { Request } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { verifyConversation } from '@/middlewares/verify-match-handlers';

const messageRouter = express.Router();

messageRouter.get(
  '/:userId/messages/:conversationId',
  getUserId,
  async (req: Request, res) => {
    //this block will change with the middleware, from an other pr
    try {
      const conversationId = Number.parseInt(req.params.conversationId);

      const { userId } = req.params;
      const userIniator = req.userId as number;

      if (Number(userId) !== userIniator) {
        return res.status(403).send('Unauthorized');
      }

      const messages = await db
        .selectFrom('message as m')
        .innerJoin('user as u', 'm.sender_id', 'u.id')
        .select(['m.id', 'u.name as sender_name', 'm.content', 'm.sent_at'])
        .where('m.conversation_id', '=', conversationId)
        .where('u.id', '=', Number(userId))
        .orderBy('m.sent_at', 'desc')
        .execute();

      return res.json(messages);
    } catch (error) {
      throw new Error(`Fail to get messages : ${String(error)}`);
    }
  },
);

messageRouter.get(
  '/:userId/conversations/:conversationId/last-message',
  getUserId,
  async (req: Request, res) => {
    //1er étape récuper l'id des conversations
    const { conversationId } = req.params;
    const userIniator = req.userId as number;
    const { userId } = req.params;

    if (Number(userId) !== userIniator) {
      return res.status(403).send('Unauthorized');
    }

    //2eme etape récuperer le dernier message d'une conversation

    const lastMessage = await db
      .selectFrom('message as m')
      .innerJoin('user as u', 'm.sender_id', 'u.id')
      .innerJoin('user_action as ua', 'm.conversation_id', 'ua.id')
      .select((eb) => [
        'm.conversation_id',
        jsonObjectFrom(
          eb
            .selectFrom('user as u')
            .innerJoin('picture as p', 'p.user_id', 'u.id')
            .select(['u.id', 'u.name', 'p.picture_path'])
            .whereRef('u.id', '=', 'm.sender_id')
            .orderBy('p.id asc')
            .limit(1),
        ).as('sender'),
        jsonObjectFrom(
          eb
            .selectFrom('user_action as ua')
            .innerJoin('user as u', 'ua.receiver_id', 'u.id')
            .innerJoin('picture as p', 'p.user_id', 'u.id')
            .select(['u.id', 'u.name', 'p.picture_path'])
            .whereRef('m.conversation_id', '=', 'ua.id')
            .orderBy('p.id asc')
            .limit(1),
        ).as('receiver'),
        jsonObjectFrom(
          eb
            .selectFrom('message as m')
            .innerJoin('user as u', 'm.sender_id', 'u.id')
            .whereRef('m.conversation_id', '=', 'ua.id')
            .select(['m.id', 'u.name as sender_name', 'm.content', 'm.sent_at'])
            .orderBy('m.sent_at', 'desc')
            .limit(1),
        ).as('messages'),
      ])
      .where('sender_id', '=', Number(userId))
      .where('m.conversation_id', '=', Number(conversationId))
      .groupBy('m.conversation_id')
      .execute();

    return res.json(lastMessage);
  },
);

messageRouter.post(
  '/:userId/conversations/:conversationId/message',
  getUserId,
  verifyConversation,
  async (req: Request, res) => {
    try {
      const { content } = req.body;
      const { conversationId } = req.params;
      const senderId = req.userId as number;

      await db
        .insertInto('message')
        .values({
          content,
          sent_at: new Date(), // current date and time
          conversation_id: Number(conversationId),
          sender_id: senderId,
        })
        .execute();

      return res.json({ succes: true, message: 'Message sent successfully' });
    } catch {
      return res.status(500).json({
        success: false,
        error: 'An error occurred while sending the message',
      });
    }
  },
);

//todo get route for matching card
export default messageRouter;
