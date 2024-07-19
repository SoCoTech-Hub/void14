### shows

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 }),
url: varchar("url", { length: 256 }),
description: text("description"),
transcript: text("transcript"),
showsCategoryId: varchar("shows_category_id", { length: 256 }).references(() => showsCategories.id, { onDelete: "cascade" }).notNull(),
createdAt: timestamp("created_at").notNull().default(sql`now()`),
updatedAt: timestamp("updated_at").notNull().default(sql`now()`),

### shows_categories

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 }),
description: text("description")
