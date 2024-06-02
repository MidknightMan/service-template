import { DB, migrate, migrateLocal } from "../../core/src/sql";
import { ApiHandler } from "sst/node/api";
import { AwsDataApiPgDatabase } from "drizzle-orm/aws-data-api/pg";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export const handler = ApiHandler(async (_evt) => {
  const pathToMigrations = process.env.IS_LOCAL
    ? "packages/core/migrations"
    : "migrations";

  process.env.IS_LOCAL
    ? await migrateLocal(pathToMigrations, DB as NodePgDatabase)
    : await migrate(pathToMigrations, DB as AwsDataApiPgDatabase);

  return {
    path: pathToMigrations,
    body: "Migrated!",
  };
});
