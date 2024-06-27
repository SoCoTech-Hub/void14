CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text NOT NULL,
	"name" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "backup_controllers" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"backup_id" varchar(256),
	"checksum" varchar(256),
	"controller" text,
	"execution" integer,
	"execution_time" integer,
	"format" varchar(256),
	"interactive" boolean,
	"item_id" varchar(256),
	"operation" varchar(256),
	"progress" real,
	"purpose" integer,
	"status" integer,
	"type" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "backup_courses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"last_status" varchar(256),
	"last_start_time" timestamp,
	"last_end_time" timestamp,
	"next_start_time" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "backup_logs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"backup_id" varchar(256),
	"log_level" integer,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bc_backup_id_idx" ON "backup_controllers" ("backup_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bl_backup_id_idx" ON "backup_logs" ("backup_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
