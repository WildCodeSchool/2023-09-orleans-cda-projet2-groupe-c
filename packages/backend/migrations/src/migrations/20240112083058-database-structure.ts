// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { Database } from '@app/shared';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .createTable('preference')
      .ifNotExists()
      .addColumn('id', 'int2', (col) =>
        col.autoIncrement().primaryKey().unsigned().notNull(),
      )
      .addColumn('distance', 'int8', (col) => col.unsigned().notNull())
      .addColumn('language_pref_id', 'int2', (col) => col.unsigned().notNull())
      .addColumn(
        'gender_pref',
        sql`enum('man', 'woman', 'non-binary')`,
        (col) => col.notNull(),
      )
      .addForeignKeyConstraint(
        'language_pref_id_fk',
        ['language_pref_id'],
        'language',
        ['id'],
        (callBack) => callBack.onDelete('cascade'),
      )
      .execute();

    await trx.schema
      .alterTable('user')
      .addColumn('preference_id', 'int2', (col) => col.unsigned())
      .execute();

    await trx.schema
      .alterTable('user')
      .addForeignKeyConstraint(
        'preference_id_fk',
        ['preference_id'],
        'preference',
        ['id'],
      )
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .dropConstraint('preference_id_fk')
      .execute();
    await trx.schema.alterTable('user').dropColumn('preference_id').execute();
    await trx.schema.dropTable('preference').ifExists().execute();
  });
}
