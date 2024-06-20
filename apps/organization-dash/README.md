### organizations

- id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
- name: varchar("name", { length: 256 }).notNull(),
- shortName: varchar("short_name", { length: 256 }),
- logo: varchar("logo", { length: 256 }),
- favicon: varchar("favicon", { length: 256 }),
- avatar: varchar("avatar", { length: 256 }),
- banner: varchar("banner", { length: 256 })
