// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { Database } from '@app/shared';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('preference')
      .addColumn('min_age', 'integer', (col) => col.unsigned().notNull())
      .addColumn('max_age', 'integer', (col) => col.unsigned().notNull())
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('preference')
      .dropColumn('min_age')
      .dropColumn('max_age')
      .execute();
  });
}
