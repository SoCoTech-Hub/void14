CREATE TABLE IF NOT EXISTS "h5pactivities" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course" varchar(256),
	"display_options" integer,
	"enable_tracking" boolean,
	"grade" integer,
	"grade_method" integer,
	"intro" text,
	"intro_format" integer,
	"name" varchar(256),
	"review_mode" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5pactivity_attempts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attempt" integer,
	"completion" boolean,
	"duration" integer,
	"h5p_activity_id" varchar(256),
	"max_score" integer,
	"raw_score" integer,
	"scaled" real,
	"success" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5pactivity_attempts_results" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"additionals" text,
	"attempt_id" varchar(256),
	"completion" boolean,
	"correct_pattern" text,
	"description" text,
	"duration" integer,
	"interaction_type" varchar(256),
	"max_score" integer,
	"raw_score" integer,
	"response" text,
	"sub_content" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5p_contents_libraries" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"dependency_type" varchar(256),
	"drop_css" boolean,
	"h5p_id" varchar(256),
	"library_id" varchar(256),
	"weight" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5p_libraries" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"embed_types" varchar(256),
	"add_to" text,
	"core_major" integer,
	"core_minor" integer,
	"drop_library_css" text,
	"enabled" boolean,
	"example" text,
	"full_screen" boolean,
	"machine_name" varchar(256),
	"major_version" integer,
	"meta_data_settings" text,
	"minor_version" integer,
	"patch_version" integer,
	"pre_loaded_css" text,
	"pre_loaded_js" text,
	"runnable" boolean,
	"semantics" text,
	"title" varchar(256),
	"tutorial" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5p_libraries_cachedassets" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"hash" varchar(256),
	"h5p_library_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5p_library_dependencies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"dependency_type" varchar(256),
	"h5p_library_id" varchar(256) NOT NULL,
	"required_library_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "h5ps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content_hash" varchar(256),
	"display_options" integer,
	"filtered" text,
	"json_content" text,
	"main_library_id" varchar(256),
	"path_name_hash" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "h5p_libraries_cachedassets" ADD CONSTRAINT "h5p_libraries_cachedassets_h5p_library_id_h5p_libraries_id_fk" FOREIGN KEY ("h5p_library_id") REFERENCES "public"."h5p_libraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "h5p_library_dependencies" ADD CONSTRAINT "h5p_library_dependencies_h5p_library_id_h5p_libraries_id_fk" FOREIGN KEY ("h5p_library_id") REFERENCES "public"."h5p_libraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
