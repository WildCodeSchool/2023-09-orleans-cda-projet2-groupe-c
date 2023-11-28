// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .createTable('hobby_category')
      .ifNotExists()
      .addColumn('id', 'int2', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(50)', (col) => col.notNull())
      .addColumn('logo_path', 'varchar(255)', (col) => col.notNull())
      .execute();

    await trx.schema
      .createTable('technology')
      .ifNotExists()
      .addColumn('id', 'int2', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(50)', (col) => col.notNull())
      .addColumn('logo_path', 'varchar(255)', (col) => col.notNull())
      .execute();

    await trx.schema
      .createTable('language')
      .ifNotExists()
      .addColumn('id', 'int2', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(50)', (col) => col.notNull())
      .addColumn('logo_path', 'varchar(255)', (col) => col.notNull())
      .execute();

    await trx.schema
      .createTable('picture')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('logo_path', 'varchar(255)')
      .execute();

    await trx.schema
      .createTable('hobby')
      .ifNotExists()
      .addColumn('id', 'int2', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(50)', (col) => col.notNull())
      .addColumn('hobby_category_id', 'int2', (col) => col.unsigned().notNull())
      .addForeignKeyConstraint(
        'hobby_category_id_fk',
        ['hobby_category_id'],
        'hobby_category',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .createTable('city')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(255)', (col) => col.notNull())
      .addColumn('coordinates', sql`point`)
      .execute();

    await trx.schema
      .createTable('user')
      .ifNotExists()
      .addColumn('id', 'int4', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(100)')
      .addColumn('birthdate', 'date')
      .addColumn('gender', sql`enum('man', 'woman', 'non-binary')`)
      .addColumn('biography', 'text')
      .addColumn('account_github', 'varchar(255)')
      .addColumn('role', sql`enum('user', 'admin')`, (col) =>
        col.defaultTo('user').notNull(),
      )
      .addColumn('email', 'varchar(255)', (col) => col.unique().notNull())
      .addColumn('password', 'varchar(255)', (col) => col.notNull())
      .addColumn('email_verified_at', 'datetime')
      .addColumn('activation_code', 'varchar(6)')
      .addColumn('activate_at', 'datetime')
      .addColumn('city_id', 'integer', (col) => col.unsigned())
      .addForeignKeyConstraint(
        'city_id_fk',
        ['city_id'],
        'city',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .createTable('technology_user')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('order', 'integer', (col) => col.unsigned())
      .addColumn('user_id', 'int4', (col) => col.unsigned().notNull())
      .addColumn('technology_id', 'int2', (col) => col.unsigned().notNull())
      .addForeignKeyConstraint(
        'user_id_fk',
        ['user_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'technology_id_fk',
        ['technology_id'],
        'technology',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .createTable('language_user')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('order', 'integer', (col) => col.unsigned())
      .addColumn('user_id', 'int4', (col) => col.unsigned().notNull())
      .addColumn('language_id', 'int2', (col) => col.unsigned().notNull())
      .addForeignKeyConstraint(
        'language_user_id_fk',
        ['user_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'language_id_fk',
        ['language_id'],
        'language',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
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
        'picture_user_id_fk',
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

    await trx.schema
      .createTable('hobby_user')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('order', 'integer', (col) => col.unsigned())
      .addColumn('user_id', 'int4', (col) => col.unsigned())
      .addColumn('hobby_id', 'int2', (col) => col.unsigned())
      .addForeignKeyConstraint(
        'hobby_user_id_fk',
        ['user_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'hobby_id_fk',
        ['hobby_id'],
        'hobby',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .createTable('user_action')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('initiator_id', 'int4', (col) => col.unsigned().notNull())
      .addColumn('receiver_id', 'int4', (col) => col.unsigned().notNull())
      .addColumn('liked_at', 'datetime')
      .addColumn('superlike_at', 'datetime')
      .addColumn('next_at', 'datetime')
      .addColumn('canceled_at', 'datetime')
      .addForeignKeyConstraint(
        'initiator_id_fk',
        ['initiator_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'receiver_id_fk',
        ['receiver_id'],
        'user',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .createTable('message')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('content', 'text')
      .addColumn('sent_at', 'datetime', (col) => col.notNull())
      .addColumn('conversation_id', 'integer', (col) =>
        col.unsigned().notNull(),
      )
      .addColumn('sender_id', 'int4', (col) => col.unsigned().notNull())
      .addForeignKeyConstraint(
        'conversation_id_fk',
        ['conversation_id'],
        'user_action',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .addForeignKeyConstraint(
        'sender_id_fk',
        ['sender_id'],
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
    await trx.schema.dropTable('message').ifExists().execute();
    await trx.schema.dropTable('user_action').ifExists().execute();
    await trx.schema.dropTable('hobby_user').ifExists().execute();
    await trx.schema.dropTable('picture_user').ifExists().execute();
    await trx.schema.dropTable('language_user').ifExists().execute();
    await trx.schema.dropTable('technology_user').ifExists().execute();
    await trx.schema.dropTable('user').ifExists().execute();
    await trx.schema.dropTable('city').ifExists().execute();
    await trx.schema.dropTable('hobby').ifExists().execute();
    await trx.schema.dropTable('picture').ifExists().execute();
    await trx.schema.dropTable('language').ifExists().execute();
    await trx.schema.dropTable('technology').ifExists().execute();
    await trx.schema.dropTable('hobby_category').ifExists().execute();
  });
}
