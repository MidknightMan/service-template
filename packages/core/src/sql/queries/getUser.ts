import { InferModel } from "drizzle-orm";
import { users } from "../schema";
import { DB } from "..";

export type User = InferModel<typeof users>;

export async function getAllUsers() {
  const allUsers = await DB.select().from(users);
  return allUsers;
}
