### notes

- organizationId: varchar('organization_id', { length: 191 }).notNull(),
  id: varchar('id', { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
- name: varchar('name', { length: 256 }).notNull(),
- body: text('body'),
- userId: varchar('user_id', { length: 256 }).notNull(),
- createdAt: timestamp('created_at').notNull().default(sql`now()`),
- updatedAt: timestamp('updated_at').notNull().default(sql`now()`)
