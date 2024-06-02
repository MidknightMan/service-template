import { AwsDataApiPgDatabase, drizzle } from "drizzle-orm/aws-data-api/pg";
import { migrate as local_mig } from "drizzle-orm/node-postgres/migrator";
import {
  NodePgDatabase,
  drizzle as drizlocal,
} from "drizzle-orm/node-postgres";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";
import { migrate as mig } from "drizzle-orm/aws-data-api/pg/migrator";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "my_database",
});

export const DB = process.env.IS_LOCAL
  ? drizlocal(pool)
  : drizzle(new RDSData({}), {
      database: RDS.Database.defaultDatabaseName,
      secretArn: RDS.Database.secretArn,
      resourceArn: RDS.Database.clusterArn,
    });

export const migrate = async (path: string, database: AwsDataApiPgDatabase) => {
  return mig(database, { migrationsFolder: path });
};

export const migrateLocal = async (path: string, database: NodePgDatabase) => {
  return local_mig(database, { migrationsFolder: path });
};

export * as SQL from "./index";
