// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.schema
    .createTable('category')
    .addColumn('id', 'int2', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('logo_path', 'varchar(255)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('technology')
    .addColumn('id', 'int2', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('logo_path', 'varchar(255)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('language')
    .addColumn('id', 'int2', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('logo_path', 'varchar(255)', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('picture')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('logo_path', 'varchar(255)')
    .execute();

  await db.schema
    .createTable('hobby')
    .addColumn('id', 'int2', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('category_id', 'integer', (col) =>
      col.references('category.id').onDelete('cascade').notNull(),
    )
    .execute();

  await db.schema
    .createTable('city')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('coordinates', sql`point`)
    .execute();

  await db.schema
    .createTable('user')
    .addColumn('id', 'int4', (col) =>
      col.autoIncrement().primaryKey().unsigned().notNull(),
    )
    .addColumn('name', 'varchar(100)')
    .addColumn('birthdate', 'date')
    .addColumn('gender', sql`enum('man', 'woman', 'no-binary')`)
    .addColumn('biography', 'text')
    .addColumn('account_github', 'varchar(255)')
    .addColumn('role', sql`enum('user', 'admin')`)
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('email_verified_at', 'date')
    .addColumn('activate_code', 'varchar(6)')
    .addColumn('activate_at', 'date')
    .addColumn('city_id', 'integer', (col) =>
      col.references('city.id').onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('technology_user')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('order', 'integer')
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .addColumn('technology_id', 'integer', (col) =>
      col.references('technology.id').onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('language_user')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('order', 'integer')
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .addColumn('language_id', 'integer', (col) =>
      col.references('language.id').onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('picture_user')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('order', 'integer')
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .addColumn('picture_id', 'integer', (col) =>
      col.references('picture.id').onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('hobby_user')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('order', 'integer')
    .addColumn('user_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .addColumn('hobby_id', 'integer', (col) =>
      col.references('hobby.id').onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('user_action')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('initiator_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .addColumn('receiver_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .addColumn('like_at', 'datetime')
    .addColumn('superlike_at', 'datetime')
    .addColumn('next_at', 'datetime')
    .addColumn('canceled_at', 'datetime')
    .execute();

  await db.schema
    .createTable('message')
    .addColumn('id', 'integer', (col) =>
      col.autoIncrement().primaryKey().notNull(),
    )
    .addColumn('content', 'text')
    .addColumn('sent_at', 'datetime', (col) => col.notNull())
    .addColumn('conversation_id', 'integer', (col) =>
      col.references('user_action.id').onDelete('cascade'),
    )
    .addColumn('sender_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade'),
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.schema.dropTable('message').ifExists().execute();
  await db.schema.dropTable('user_action').ifExists().execute();
  await db.schema.dropTable('hobby_user').ifExists().execute();
  await db.schema.dropTable('picture_user').ifExists().execute();
  await db.schema.dropTable('language_user').ifExists().execute();
  await db.schema.dropTable('technology_user').ifExists().execute();
  await db.schema.dropTable('user').ifExists().execute();
  await db.schema.dropTable('city').ifExists().execute();
  await db.schema.dropTable('hobby').ifExists().execute();
  await db.schema.dropTable('picture').ifExists().execute();
  await db.schema.dropTable('language').ifExists().execute();
  await db.schema.dropTable('technology').ifExists().execute();
  await db.schema.dropTable('category').ifExists().execute();
}
