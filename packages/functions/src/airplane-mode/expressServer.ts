import "dotenv/config";
import express from "express";
import cors from "cors";
import { migrateLocal, DB } from "../../../core/src/sql";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/healthcheck", (_req, res) => {
  res.send("OK");
});

app.get("/migrate", async (_req, res) => {
  try {
    const pathToMigrations = "packages/core/migrations";
    await migrateLocal(pathToMigrations, DB as NodePgDatabase);
    res.send({ path: pathToMigrations, body: "Migrated!" });
  } catch (error: unknown) {
    res.status(500).send({ error: JSON.stringify(error) });
  }
});

export default app;
