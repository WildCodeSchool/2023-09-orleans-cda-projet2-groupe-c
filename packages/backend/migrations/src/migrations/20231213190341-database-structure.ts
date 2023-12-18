// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema.alterTable('user').dropConstraint('city_id_fk').execute();

    await trx.schema.alterTable('user').dropColumn('city_id').execute();

    await trx.schema.dropTable('city').ifExists().execute();

    await trx.schema
      .createTable('city')
      .ifNotExists()
      .addColumn('id', 'int8', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(255)', (col) => col.notNull())
      .addColumn('coordinates', sql`point`, (col) => col.notNull())
      .execute();

    await trx.schema
      .alterTable('user')
      .addColumn('city_id', 'int8', (col) => col.unsigned())
      .execute();

    await trx.schema
      .alterTable('user')
      .addForeignKeyConstraint('city_id_fk', ['city_id'], 'city', ['id'])
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema.alterTable('user').dropConstraint('city_id_fk').execute();

    await trx.schema.alterTable('user').dropColumn('city_id').execute();

    await trx.schema.dropTable('city').ifExists().execute();

    await trx.schema
      .createTable('city')
      .ifNotExists()
      .addColumn('id', 'integer', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('name', 'varchar(255)', (col) => col.notNull())
      .addColumn('coordinates', sql`point`, (col) => col.notNull())
      .execute();

    await trx.schema
      .alterTable('user')
      .addColumn('city_id', 'integer', (col) => col.unsigned())
      .execute();

    await trx.schema
      .alterTable('user')
      .addForeignKeyConstraint('city_id_fk', ['city_id'], 'city', ['id'])
      .execute();
  });
}
