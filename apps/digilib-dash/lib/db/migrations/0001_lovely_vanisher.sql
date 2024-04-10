ALTER TABLE "digilib" RENAME TO "digilibs";--> statement-breakpoint
ALTER TABLE "digilibs" RENAME COLUMN "download" TO "is_downloadable";--> statement-breakpoint
ALTER TABLE "digilibs" DROP CONSTRAINT "digilib_digilib_category_id_digilib_categories_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "digilibs" ADD CONSTRAINT "digilibs_digilib_category_id_digilib_categories_id_fk" FOREIGN KEY ("digilib_category_id") REFERENCES "digilib_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
