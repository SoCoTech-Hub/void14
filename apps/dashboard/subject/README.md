### subjects

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
icon: varchar("icon", { length: 256 }),
color: varchar("color", { length: 256 })

### subject_categories

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
organizationId: varchar("organization_id", { length: 256 }).notNull(),
image: varchar("image", { length: 256 })

### subjects_subject_categories (Link Table)

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
subjectCategoryId: varchar("subject_category_id", { length: 191 }).references(() => subjectCategories.id, { onDelete: "cascade" }).notNull(),
subjectId: varchar("subject_id", { length: 191 }).references(() => subjects.id, { onDelete: "cascade" }).notNull()
