CREATE TABLE IF NOT EXISTS "quizaccess_seb_quiz_settings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"activate_url_filtering" boolean,
	"allowed_browser_exam_keys" text,
	"allow_reload_in_exam" boolean NOT NULL,
	"allow_spell_checking" boolean NOT NULL,
	"allow_user_quit_seb" boolean NOT NULL,
	"cm_id" varchar(256) NOT NULL,
	"enable_audio_control" boolean NOT NULL,
	"expressions_allowed" text,
	"expressions_blocked" text,
	"filter_embedded_content" boolean NOT NULL,
	"link_quitseb" text,
	"mute_on_startup" boolean NOT NULL,
	"quit_password" text,
	"del" integer,
	"quiz_id" varchar(256) NOT NULL,
	"regex_allowed" text,
	"regex_blocked" text,
	"require_safe_exam_browser" boolean NOT NULL,
	"show_keyboard_layout" boolean NOT NULL,
	"show_reload_button" boolean NOT NULL,
	"show_seb_download_link" boolean NOT NULL,
	"show_seb_taskbar" boolean NOT NULL,
	"show_time" boolean NOT NULL,
	"show_wifi_control" boolean NOT NULL,
	"quizaccess_seb_template_id" varchar(256) NOT NULL,
	"user_confirm_quit" boolean NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizaccess_seb_templates" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text,
	"description" text,
	"enabled" boolean NOT NULL,
	"name" varchar(256) NOT NULL,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizaccess_seb_quiz_settings" ADD CONSTRAINT "quizaccess_seb_quiz_settings_quizaccess_seb_template_id_quizaccess_seb_templates_id_fk" FOREIGN KEY ("quizaccess_seb_template_id") REFERENCES "public"."quizaccess_seb_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quizaccess_seb_quiz_settings_quizaccess_seb_template_id_idx" ON "quizaccess_seb_quiz_settings" USING btree ("quizaccess_seb_template_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quizaccess_seb_templates_name_idx" ON "quizaccess_seb_templates" USING btree ("name");