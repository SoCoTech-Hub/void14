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
CREATE TABLE IF NOT EXISTS "big_blue_button_bn_logs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"big_blue_button_bn_id" varchar(256) NOT NULL,
	"course_id" varchar(256),
	"log" varchar(256),
	"meeting_id" varchar(256),
	"meta" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "big_blue_button_bn_recordings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"big_blue_button_bn_id" varchar(256) NOT NULL,
	"course_id" varchar(256),
	"group_id" varchar(256),
	"headless" boolean,
	"imported" boolean,
	"imported_data" text,
	"recording_id" varchar(256),
	"status" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "big_blue_button_bns" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"client_type" boolean,
	"closing_time" timestamp,
	"completion_attendance" integer,
	"completion_engagement_chats" integer,
	"completion_engagement_emojis" integer,
	"completion_engagement_poll_votes" integer,
	"completion_engagement_raise_hand" integer,
	"completion_engagement_talks" integer,
	"course_id" varchar(256),
	"disable_cam" boolean,
	"disable_mic" boolean,
	"disable_note" boolean,
	"disable_private_chat" boolean,
	"disable_public_chat" boolean,
	"hide_user_list" boolean,
	"intro" text,
	"intro_format" integer,
	"locked_layout" boolean,
	"lock_on_join" boolean,
	"lock_on_join_configurable" boolean,
	"meeting_id" varchar(256),
	"moderator_pass" varchar(256),
	"mute_on_start" boolean,
	"name" varchar(256),
	"opening_time" timestamp,
	"participants" text,
	"presentation" text,
	"record" boolean,
	"record_all_from_start" boolean,
	"record_hide_button" boolean,
	"recordings_deleted" boolean,
	"recordings_html" boolean,
	"recordings_imported" boolean,
	"recordings_preview" boolean,
	"type" integer,
	"user_limit" integer,
	"viewer_pass" varchar(256),
	"voice_bridge" integer,
	"wait" boolean,
	"welcome" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bl_course_id_idx" ON "big_blue_button_bn_logs" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "br_course_id_idx" ON "big_blue_button_bn_recordings" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_id_idx" ON "big_blue_button_bns" ("course_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "big_blue_button_bn_logs" ADD CONSTRAINT "big_blue_button_bn_logs_big_blue_button_bn_id_big_blue_button_bns_id_fk" FOREIGN KEY ("big_blue_button_bn_id") REFERENCES "big_blue_button_bns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "big_blue_button_bn_recordings" ADD CONSTRAINT "big_blue_button_bn_recordings_big_blue_button_bn_id_big_blue_button_bns_id_fk" FOREIGN KEY ("big_blue_button_bn_id") REFERENCES "big_blue_button_bns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
