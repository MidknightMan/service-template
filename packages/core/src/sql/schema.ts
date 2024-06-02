import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial(`id`),
    name: text("name"),
  },
  (table) => {
    return {
      pk: primaryKey(table.id),
    };
  },
);

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("category"),
});

export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const newspaper = pgTable("newspaper", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title"),
  category_id: integer("category_id").references(() => category.id),
});

export const articleAuthors = pgTable("article_authors", {
  id: serial("id").primaryKey(),
  author_id: integer("author_id").references(() => users.id),
  article_id: integer("article_id").references(() => articles.id),
});
