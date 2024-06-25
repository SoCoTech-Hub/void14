CREATE TABLE IF NOT EXISTS "custom_field_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"area" varchar(256),
	"component" varchar(256),
	"context_id" varchar(256),
	"description" text,
	"description_format" integer,
	"item_id" varchar(256),
	"name" varchar(256),
	"sort_order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "custom_field_datas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"char_value" varchar(256),
	"context_id" varchar(256),
	"dec_value" real,
	"field_id" varchar(256),
	"instance_id" varchar(256),
	"int_value" integer,
	"short_char_value" varchar(256),
	"value" text,
	"value_format" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "custom_field_fields" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"custom_field_category_id" varchar(256) NOT NULL,
	"config_data" text,
	"description" text,
	"description_format" integer,
	"name" varchar(256),
	"short_name" varchar(256),
	"sort_order" integer,
	"type" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_field_fields" ADD CONSTRAINT "custom_field_fields_custom_field_category_id_custom_field_categories_id_fk" FOREIGN KEY ("custom_field_category_id") REFERENCES "public"."custom_field_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "custom_field_categories_sort_order" ON "custom_field_categories" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "custom_field_fields_sort_order_idx" ON "custom_field_fields" USING btree ("sort_order");