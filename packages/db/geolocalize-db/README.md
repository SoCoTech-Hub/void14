### countries

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
flag: varchar("flag", { length: 256 }),
currency: varchar("currency", { length: 256 })

### districts

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
provinceId: varchar("province_id", { length: 256 }).references(() => provinces.id, { onDelete: "cascade" }).notNull()

### provinces

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
countryId: varchar("country_id", { length: 256 }).references(() => countries.id, { onDelete: "cascade" }).notNull()
