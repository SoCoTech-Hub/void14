### addresses

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- line1: varchar("line_1" { length: 256 })
- line2: varchar("line_2" { length: 256 })
- city: varchar("city" { length: 256 })
- zipCode: varchar("zip_code" { length: 256 })
- state: varchar("state" { length: 256 })
- country: varchar("country" { length: 256 })
- userId: varchar("user_id" { length: 256 }).notNull()
- createdAt: timestamp("created_at").notNull().default(sql`now()`)
- updatedAt: timestamp("updated_at").notNull().default(sql`now()`)

### genders

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- name: varchar("name" { length: 256 }).notNull()
- icon: varchar("icon" { length: 256 })

### nextOfKins

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- name: varchar("name" { length: 256 }).notNull()
- surname: varchar("surname" { length: 256 })
- fullName: varchar("full_name" { length: 256 })
- mobile: varchar("mobile" { length: 256 })
- email: varchar("email" { length: 256 })
- title: varchar("title" { length: 256 })
- dateOfBirth: varchar("date_of_birth" { length: 256 })
- relation: varchar("relation" { length: 256 })
- userId: varchar("user_id" { length: 256 }).notNull()
- createdAt: timestamp("created_at").notNull().default(sql`now()`)
- updatedAt: timestamp("updated_at").notNull().default(sql`now()`)

### profiles

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- name: varchar("name" { length: 256 }).notNull()
- surname: varchar("surname" { length: 256 })
- fullName: varchar("full_name" { length: 256 })
- idNumber: varchar("id_number" { length: 256 })
- mobile: varchar("mobile" { length: 256 })
- bio: text("bio")
- dateOfBirth: date("date_of_birth")
- uniqueId: varchar("unique_id" { length: 256 })
- addressId: varchar("address_id" { length: 256 }).references(() => addresses.id { onDelete: "cascade" }).notNull()
- genderId: varchar("gender_id" { length: 256 }).references(() => genders.id { onDelete: "cascade" }).notNull()
- nextOfKinId: varchar("next_of_kin_id" { length: 256 }).references(() => nextOfKins.id { onDelete: "cascade" }).notNull()
- userId: varchar("user_id" { length: 256 }).notNull()
- createdAt: timestamp("created_at").notNull().default(sql`now()`)
- updatedAt: timestamp("updated_at").notNull().default(sql`now()`)
