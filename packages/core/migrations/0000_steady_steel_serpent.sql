CREATE TABLE IF NOT EXISTS "article_authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer,
	"article_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"category_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newspaper" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"name" text
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id" PRIMARY KEY("id");
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_authors" ADD CONSTRAINT "article_authors_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "article_authors" ADD CONSTRAINT "article_authors_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
