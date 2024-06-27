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
CREATE TABLE IF NOT EXISTS "chat_messages" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"chat_id" varchar(256) NOT NULL,
	"group_id" varchar(256),
	"is_system" boolean,
	"message" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_messages_currents" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"chat_id" varchar(256) NOT NULL,
	"group_id" varchar(256),
	"is_system" boolean,
	"message" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"chat_time" integer,
	"course_id" varchar(256),
	"intro" text,
	"intro_format" integer,
	"keep_days" integer,
	"name" varchar(256),
	"schedule" integer,
	"student_logs" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_users" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"chat_id" varchar(256) NOT NULL,
	"course_id" varchar(256),
	"first_ping" integer,
	"group_id" varchar(256),
	"ip" varchar(256),
	"lang" varchar(256),
	"last_message_ping" integer,
	"last_ping" integer,
	"sid" varchar(256),
	"version" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "cm_chat_id_idx" ON "chat_messages" ("chat_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "cmc_chat_id_idx" ON "chat_messages_currents" ("chat_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "c_course_id_idx" ON "chats" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "cu_chat_id_idx" ON "chat_users" ("chat_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_messages_currents" ADD CONSTRAINT "chat_messages_currents_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_users" ADD CONSTRAINT "chat_users_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
