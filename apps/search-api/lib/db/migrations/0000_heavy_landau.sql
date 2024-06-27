CREATE TABLE IF NOT EXISTS "search_index_requests" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"index_priority" integer,
	"partial_area" varchar(256),
	"partial_time" timestamp,
	"search_area" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "search_simpledb_indexes" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"area_id" varchar(256),
	"content" text,
	"context_id" varchar(256),
	"course_id" varchar(256),
	"description_1" text,
	"description_2" text,
	"doc_id" varchar(256),
	"item_id" varchar(256),
	"owner_user_id" varchar(256),
	"title" text,
	"type" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
