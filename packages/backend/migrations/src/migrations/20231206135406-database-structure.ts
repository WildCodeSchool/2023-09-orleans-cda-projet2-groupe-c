// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('picture_user').ifExists().execute();

    await trx.schema.dropTable('picture').ifExists().execute();

    await trx.schema
      .createTable('picture')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('order', 'integer', (col) => col.unsigned())
      .addColumn('picture_path', 'varchar(255)')
      .addColumn('user_id', 'int4', (col) => col.unsigned().notNull())
      .addForeignKeyConstraint(
        'picture_user_id_fk',
        ['user_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('picture').ifExists().execute();

    await trx.schema
      .createTable('picture')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('logo_path', 'varchar(255)')
      .execute();

    await trx.schema
      .createTable('picture_user')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('order', 'integer', (col) => col.unsigned())
      .addColumn('user_id', 'int4', (col) => col.unsigned().notNull())
      .addColumn('picture_id', 'integer', (col) => col.unsigned().notNull())
      .addForeignKeyConstraint(
        'picture_user_picture_id_fk',
        ['user_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'picture_id_fk',
        ['picture_id'],
        'picture',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();
  });
}
