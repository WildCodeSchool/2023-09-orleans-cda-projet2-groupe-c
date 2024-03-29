// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { Database } from '@app/shared';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('message')
      .dropConstraint('conversation_id_fk')
      .execute();

    await trx.schema
      .createTable('conversation')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('user_1', 'int4', (col) => col.unsigned().notNull())
      .addColumn('user_2', 'int4', (col) => col.unsigned().notNull())
      .addColumn('created_at', 'datetime', (col) => col.notNull())
      .addForeignKeyConstraint(
        'user_1_message_id_fk',
        ['user_1'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'user_2_message_id_fk',
        ['user_2'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .alterTable('message')
      .addForeignKeyConstraint(
        'conversation_id_fk',
        ['conversation_id'],
        'conversation',
        ['id'],
      )
      .onDelete('cascade')
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('message')
      .dropConstraint('conversation_id_fk')
      .execute();

    await trx.schema.dropTable('conversation').ifExists().execute();

    await trx.schema
      .alterTable('message')
      .addForeignKeyConstraint(
        'conversation_id_fk',
        ['conversation_id'],
        'user_action',
        ['id'],
      )
      .execute();
  });
}
