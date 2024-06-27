CREATE TABLE IF NOT EXISTS "sessions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"first_ip" varchar(256),
	"last_ip" varchar(256),
	"sess_data" text,
	"sid" varchar(256),
	"state" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
