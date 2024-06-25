CREATE TABLE IF NOT EXISTS "imscps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course" varchar(256),
	"intro" text,
	"intro_format" integer,
	"keep_old" integer,
	"name" varchar(256),
	"revision" integer,
	"structure" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
