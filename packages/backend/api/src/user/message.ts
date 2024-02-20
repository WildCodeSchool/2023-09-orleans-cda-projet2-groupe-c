import express from 'express';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { MessageValidation, Request } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';

const messageRouter = express.Router();

messageRouter.get(
  '/:userId/conversations',
  getUserId,
  async (req: Request, res) => {
    try {
      const userId = req.userId as number;

      //Retrieves all conversations of a user
      const conversation = await db

        .selectFrom('conversation as c')
        .innerJoin('user as initiator', 'initiator.id', 'c.user_1')
        .innerJoin('user as receiver', 'receiver.id', 'c.user_2')
        .select((eb) => [
          'c.id as conversation_id',
          // Retrieves the user's id, name and picture for user_1
          jsonObjectFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select(['u.id', 'u.name', 'p.picture_path'])
              .whereRef('u.id', '=', 'c.user_1')
              .limit(1),
          ).as('user_1'),
          jsonObjectFrom(
            //Retrieves the user's id, name and picture for user_2
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select(['u.id', 'u.name', 'p.picture_path'])
              .whereRef('u.id', '=', 'c.user_2')
              .limit(1),
          ).as('user_2'),
          //Retrieves the messages related to the conversation along with the sender's information
          jsonObjectFrom(
            eb
              .selectFrom('message as m')
              .innerJoin('user as u', 'm.sender_id', 'u.id')
              .whereRef('m.conversation_id', '=', 'c.id')
              .select([
                'm.id',
                'u.name as sender_name',
                'm.content',
                'm.sent_at',
              ])
              .orderBy('m.sent_at', 'desc')
              .limit(1),
          ).as('messages'),
        ])
        //Uses 'where' to filter the information where either the 'user_1' field equals userId or 'user_2' equals userId
        .where((eb) => eb('user_1', '=', userId).or('user_2', '=', userId))
        .execute();

      return res.json({ ok: true, conversation });
    } catch (error) {
      throw new Error(`Fail to get messages : ${String(error)}`);
    }
  },
);

//Route to retrieve the conversation with my interlocutor
messageRouter.get(
  '/:userId/conversations/:conversationId',
  getUserId,
  async (req: Request, res) => {
    try {
      const conversationId = Number.parseInt(req.params.conversationId);

      const { userId } = req.params;
      const userIniator = req.userId as number;

      if (Number(userId) !== userIniator) {
        return res.status(403).send('Unauthorized');
      }

      const messages = await db

        .selectFrom('conversation as c')
        .innerJoin('user as initiator', 'initiator.id', 'c.user_1')
        .innerJoin('user as receiver', 'receiver.id', 'c.user_2')
        .select((eb) => [
          'c.id as conversation_id',
          jsonObjectFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select(['u.id', 'u.name', 'p.picture_path'])
              .whereRef('u.id', '=', 'c.user_1')
              .limit(1),
          ).as('user_1'),
          jsonObjectFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select(['u.id', 'u.name', 'p.picture_path'])
              .whereRef('u.id', '=', 'c.user_2')
              .limit(1),
          ).as('user_2'),
          jsonArrayFrom(
            eb
              .selectFrom('message as m')
              .innerJoin('user as u', 'm.sender_id', 'u.id')
              .whereRef('m.conversation_id', '=', 'c.id')
              .select([
                'm.id',
                'u.name as sender_name',
                'm.content',
                'm.sent_at',
              ])
              .orderBy('m.sent_at', 'desc'),
          ).as('messages'),
        ])
        .where((eb) =>
          eb('user_2', '=', Number(userId)).or('user_1', '=', Number(userId)),
        )
        .where('c.id', '=', Number(conversationId))

        .execute();

      return res.json(messages);
    } catch (error) {
      throw new Error(`Fail to get messages : ${String(error)}`);
    }
  },
);

//  route for recording messages of a conversation
messageRouter.post(
  '/:userId/conversations/:conversationId/message',
  getUserId,
  async (req: Request, res) => {
    try {
      const { content } = req.body as MessageValidation;
      const { conversationId } = req.params;
      const senderId = req.userId as number;

      await db
        .insertInto('message')
        .values({
          content,
          sent_at: new Date(),
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
