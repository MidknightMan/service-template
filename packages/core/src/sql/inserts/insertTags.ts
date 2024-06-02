import { InferModel } from "drizzle-orm";
import { tag } from "../schema";
import { DB } from "..";

export type Tag = InferModel<typeof tag>;
export type NewTag = InferModel<typeof tag, "insert">; // insert type

export async function insertTag(tagToInsert: NewTag) {
  if (!tagToInsert.name) {
    throw new Error("no tag name found");
  }
  const newTagInserted = await DB.insert(tag).values(tagToInsert).returning();

  return newTagInserted[0];
}
