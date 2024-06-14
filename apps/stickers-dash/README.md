### stickers

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }),
image: varchar("image", { length: 256 }),
mimeType: varchar("mime_type", { length: 256 }),
extension: varchar("extension", { length: 256 }),
organizationId: varchar("organization_id", { length: 256 })
