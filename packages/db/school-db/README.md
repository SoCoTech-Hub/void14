### grades

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 })

### schools

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
telephone: varchar("telephone", { length: 256 }),
country: varchar("country", { length: 256 }),
province: varchar("province", { length: 256 }),
suburb: varchar("suburb", { length: 256 }),
district: varchar("district", { length: 256 }),
gradeId: varchar("grade_id", { length: 256 }).references(() => grades.id, { onDelete: "cascade" }).notNull()

### user_grades

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
gradeId: varchar("grade_id", { length: 256 }).references(() => grades.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()

### user_schools

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
schoolId: varchar("school_id", { length: 256 }).references(() => schools.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()
