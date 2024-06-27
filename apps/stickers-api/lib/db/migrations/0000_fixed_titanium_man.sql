CREATE TABLE IF NOT EXISTS "stickers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"image" varchar(256),
	"mime_type" varchar(256),
	"extension" varchar(256)
);
