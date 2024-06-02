import { InferModel } from "drizzle-orm";
import { tag } from "../schema";
import { DB } from "..";

export type Tag = InferModel<typeof tag>;

export async function getAllTags() {
  const allTags = await DB.select().from(tag);
  return allTags;
}
