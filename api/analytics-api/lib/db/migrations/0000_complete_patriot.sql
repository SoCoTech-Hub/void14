CREATE TABLE IF NOT EXISTS "analytics_indicator_calcs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"start_time" timestamp,
	"end_time" timestamp,
	"indicator" varchar(256),
	"sample_id" varchar(256),
	"sample_origin" varchar(256),
	"value" real,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_model_logs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"dir" text,
	"evaluation_mode" varchar(256),
	"indicators" text,
	"info" text,
	"model_id" varchar(256),
	"score" real,
	"target" varchar(256),
	"time_splitting" varchar(256),
	"version" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_models" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_ids" text,
	"is_enabled" boolean,
	"indicators" text,
	"name" varchar(256),
	"predictions_processor" varchar(256),
	"target" varchar(256),
	"time_splitting" varchar(256),
	"is_trained" boolean,
	"version" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_prediction_actions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action_name" varchar(256),
	"prediction_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_predictions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"calculations" text,
	"context_id" varchar(256),
	"model_id" varchar(256),
	"prediciton" real,
	"prediciton_score" real,
	"range_index" integer,
	"sample_id" varchar(256),
	"start_time" timestamp,
	"end_time" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_predict_samples" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"analysable_id" varchar(256),
	"model_id" varchar(256),
	"range_index" varchar(256),
	"sample_ids" text,
	"time_splitting" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_train_samples" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"analysable_id" varchar(256),
	"model_id" varchar(256),
	"sample_ids" text,
	"time_splitting" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_used_analysables" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"analysable_id" varchar(256),
	"first_analysis" varchar(256),
	"model_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics_used_files" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"file_id" varchar(256),
	"model_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE UNIQUE INDEX IF NOT EXISTS "aml_model_id_idx" ON "analytics_model_logs" ("model_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "prediction_id_idx" ON "analytics_prediction_actions" ("prediction_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ap_model_id_idx" ON "analytics_predictions" ("model_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "aps_model_id_idx" ON "analytics_predict_samples" ("model_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ats_model_id_idx" ON "analytics_train_samples" ("model_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "aua_model_id_idx" ON "analytics_used_analysables" ("model_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auf_model_id_idx" ON "analytics_used_files" ("model_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
