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
CREATE TABLE IF NOT EXISTS "blog_comments" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"blog_id" varchar(256) NOT NULL,
	"comment" text NOT NULL,
	"parent_id" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blogs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"description" varchar(256) NOT NULL,
	"feature_image" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_icons" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"emoji" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_reactions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"blog_id" varchar(256) NOT NULL,
	"social_icon_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"user_id" varchar(255),
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"stripe_price_id" varchar(255),
	"stripe_current_period_end" timestamp,
	CONSTRAINT "subscriptions_user_id_stripe_customer_id_pk" PRIMARY KEY("user_id","stripe_customer_id"),
	CONSTRAINT "subscriptions_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "subscriptions_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "blog_id_idx" ON "blog_comments" ("blog_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "blogs" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emoji_idx" ON "social_icons" ("emoji");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "social_reactions_blog_id_idx" ON "social_reactions" ("blog_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "social_reactions" ADD CONSTRAINT "social_reactions_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "social_reactions" ADD CONSTRAINT "social_reactions_social_icon_id_social_icons_id_fk" FOREIGN KEY ("social_icon_id") REFERENCES "social_icons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
