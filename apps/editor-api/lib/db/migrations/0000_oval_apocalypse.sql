CREATE TABLE IF NOT EXISTS "editor_atto_autosaves" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"draft_id" varchar(256),
	"draft_text" text,
	"element_id" varchar(256),
	"page_hash" varchar(256),
	"page_instance" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
