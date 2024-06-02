import { InferModel } from "drizzle-orm";
import { users } from "../schema";
import { DB } from "..";

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">; // insert type

export async function insertUser(user: NewUser) {
  if (!user.name) {
    throw new Error("no username found");
  }
  const newUserInserted = await DB.insert(users).values(user).returning();

  return newUserInserted[0];
}
