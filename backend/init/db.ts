import * as pg from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, sql, and, not, isNotNull, isNull, desc } from 'drizzle-orm';

import * as schema from '@drizzle-schema';

const DB_CONN_STRING = process.env.DB_CONN_STRING ?? 'postgres://user:password@localhost:5432/test';

const queryClient = pg.default(DB_CONN_STRING);

function dbClient() {
  return drizzle(queryClient, {
    schema,
    logger: process.env.API_ENV !== 'production',
  });
}

const db = dbClient();

export { db, eq, sql, and, not, isNotNull, isNull, desc };
