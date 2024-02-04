import express from 'express';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { Request } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { verifyConversation } from '@/middlewares/verify-match-handlers';

const messageRouter = express.Router();

messageRouter.get(
  '/:userId/conversations',
  getUserId,
  async (req: Request, res) => {
    try {
      const userId = req.userId as number;

      const conversation = await db
        .selectFrom('conversation as c')
        .innerJoin('user as receiver', 'receiver.id', 'c.receiver_id')
        .innerJoin('user as initiator', 'initiator.id', 'c.initiator_id')
        .leftJoin('message as m', 'c.last_message', 'm.id')
        .select((eb) => [
          'c.id as conversation_id',
          jsonObjectFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select(['u.id', 'u.name as initiator_name', 'p.picture_path'])
              .whereRef('u.id', '=', 'c.initiator_id')
              .limit(1),
          ).as('sender'),
          jsonArrayFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select([
                'u.id',
                'u.name as receiver_name',
                'p.picture_path',
                'u.birthdate',
              ])
              .whereRef('u.id', '=', 'c.receiver_id')
              .limit(1),
          ).as('receiver'),
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
              .orderBy('m.sent_at', 'desc')
              .limit(1),
          ).as('messages'),
        ])
        // .where('initiator_id', '=', userId)
        // .where('receiver_id', '=', userId)
        .where((eb) =>
          eb('initiator_id', '=', userId).or('receiver_id', '=', userId),
        )
        .execute();

      // const conversation = await db
      //   .selectFrom('message as m')
      //   .innerJoin('user as u', 'm.sender_id', 'u.id')
      //   .innerJoin('user_action as ua', 'm.conversation_id', 'ua.id')
      //   .whereRef('m.sender_id', '=', 'u.id')
      //   .select((eb) => [
      //     'm.conversation_id',
      //     jsonArrayFrom(
      //       eb
      //         .selectFrom('user as u')
      //         .innerJoin('picture as p', 'p.user_id', 'u.id')
      //         .select(['u.id', 'u.name as sender_name', 'p.picture_path'])
      //         .whereRef('u.id', '=', 'm.sender_id')
      //         .orderBy('p.id', 'asc')
      //         .limit(1),
      //     ).as('sender'),
      //     jsonArrayFrom(
      //       eb
      //         .selectFrom('user_action as ua')
      //         .innerJoin('user as u', 'ua.receiver_id', 'u.id')
      //         .innerJoin('picture as p', 'p.user_id', 'u.id')
      //         .select([
      //           'u.id',
      //           'u.name as receiver_name',
      //           'p.picture_path',
      //           'u.birthdate as receiver_birthdate',
      //         ])
      //         .whereRef('m.conversation_id', '=', 'ua.id')
      //         .orderBy('p.id', 'asc')
      //         .limit(1),
      //     ).as('receiver'),
      //     jsonArrayFrom(
      //       eb
      //         .selectFrom('message as m')
      //         .innerJoin('user as u', 'm.sender_id', 'u.id')
      //         .whereRef('m.conversation_id', '=', 'ua.id')
      //         .select([
      //           'm.id',
      //           'u.name as sender_name',
      //           'm.content',
      //           'm.sent_at',
      //         ])
      //         .orderBy('m.sent_at', 'desc')
      //         .limit(1),
      //     ).as('messages'),
      //   ])
      //   .where('sender_id', '=', userId)
      //   .groupBy('m.conversation_id')
      //   .execute();

      return res.json(conversation);
    } catch (error) {
      throw new Error(`Fail to get messages : ${String(error)}`);
    }
  },
);

messageRouter.get(
  '/:userId/conversations/:conversationId',
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

        .selectFrom('conversation as c')
        .innerJoin('user as receiver', 'receiver.id', 'c.receiver_id')
        .innerJoin('user as initiator', 'initiator.id', 'c.initiator_id')
        .leftJoin('message as m', 'c.last_message', 'm.id')
        .select((eb) => [
          'c.id as conversation_id',
          jsonObjectFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select(['u.id', 'u.name as initiator_name', 'p.picture_path'])
              .whereRef('u.id', '=', 'c.initiator_id')
              .limit(1),
          ).as('sender'),
          jsonArrayFrom(
            eb
              .selectFrom('user as u')
              .innerJoin('picture as p', 'p.user_id', 'u.id')
              .select([
                'u.id',
                'u.name as receiver_name',
                'p.picture_path',
                'u.birthdate',
              ])
              .whereRef('u.id', '=', 'c.receiver_id')
              .limit(1),
          ).as('receiver'),
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
          eb('receiver_id', '=', Number(userId)).or(
            'initiator_id',
            '=',
            Number(userId),
          ),
        )
        .where('c.id', '=', Number(conversationId))

        .execute();

      // .selectFrom('message as m')
      // .innerJoin('user as u', 'm.sender_id', 'u.id')
      // .innerJoin('user_action as ua', 'm.conversation_id', 'ua.id')
      // .select((eb) => [
      //   'm.conversation_id',
      //   jsonObjectFrom(
      //     eb
      //       .selectFrom('user as u')
      //       .innerJoin('picture as p', 'p.user_id', 'u.id')
      //       .select(['u.id', 'u.name', 'p.picture_path'])
      //       .whereRef('u.id', '=', 'm.sender_id')
      //       .orderBy('p.id asc')
      //       .limit(1),
      //   ).as('sender'),
      //   jsonObjectFrom(
      //     eb
      //       .selectFrom('user_action as ua')
      //       .innerJoin('user as u', 'ua.receiver_id', 'u.id')
      //       .innerJoin('picture as p', 'p.user_id', 'u.id')
      //       .select(['u.id', 'u.name', 'p.picture_path'])
      //       .whereRef('m.conversation_id', '=', 'ua.id')
      //       .orderBy('p.id asc')
      //       .limit(1),
      //   ).as('receiver'),
      //   jsonArrayFrom(
      //     eb
      //       .selectFrom('message as m')
      //       .innerJoin('user as u', 'm.sender_id', 'u.id')
      //       .whereRef('m.conversation_id', '=', 'ua.id')
      //       .select([
      //         'm.id',
      //         'u.name as sender_name',
      //         'm.content',
      //         'm.sent_at',
      //       ])
      //       .orderBy('m.sent_at', 'desc'),
      //   ).as('messages'),
      // ])
      // .where('sender_id', '=', Number(userId))
      // .where('m.conversation_id', '=', Number(conversationId))
      // .groupBy('m.conversation_id')
      // .execute();

      return res.json(messages);
    } catch (error) {
      throw new Error(`Fail to get messages : ${String(error)}`);
    }
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
