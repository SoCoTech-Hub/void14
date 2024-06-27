ALTER TABLE "social_emoji" RENAME TO "social_emojis";--> statement-breakpoint
ALTER TABLE "socials" DROP CONSTRAINT "socials_social_emoji_id_social_emoji_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "socials" ADD CONSTRAINT "socials_social_emoji_id_social_emojis_id_fk" FOREIGN KEY ("social_emoji_id") REFERENCES "social_emojis"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
