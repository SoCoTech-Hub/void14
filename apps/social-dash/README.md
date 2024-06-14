### social_emojis

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 })

### social_links

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 }),
url: varchar("url", { length: 256 })

### socials

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
tableName: varchar("table_name", { length: 256 }).notNull(),
fieldId: varchar("field_id", { length: 256 }).notNull(),
socialEmojiId: varchar("social_emoji_id", { length: 256 }).references(() => socialEmojis.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()

### social_shares

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
fieldId: varchar("field_id", { length: 256 }).notNull(),
tableName: varchar("table_name", { length: 256 }).notNull(),
socialLinkId: varchar("social_link_id", { length: 256 }).references(() => socialLinks.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()
