ALTER TABLE "zoom_lessons" ADD COLUMN "organization_id" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "zoom_meetings" ADD COLUMN "organization_id" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "zooms" ADD COLUMN "organization_id" varchar(191) NOT NULL;