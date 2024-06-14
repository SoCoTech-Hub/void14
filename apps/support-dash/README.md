# Support Dash

## Tables

List of Tables with their function described below:

### supportComments

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
comment: text("comment").notNull(),
attachments: varchar("attachments", { length: 256 }),
timeSpent: varchar("time_spent", { length: 256 }),
supportTicketId: varchar("support_ticket_id", { length: 256 }).references(() => supportTickets.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()

### supportDepartments

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
description: text("description"),
userId: varchar("user_id", { length: 256 }).notNull()

### supportStatuses

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
color: varchar("color", { length: 256 })

### supportTickets

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
descrption: text("descrption"),
attachments: varchar("attachments", { length: 256 }),
timeSpent: varchar("time_spent", { length: 256 }),
open: boolean("open"),
path: varchar("path", { length: 256 }),
device: text("device"),
assignedTo: varchar("assigned_to", { length: 256 }),
supportDepartmentId: varchar("support_department_id", { length: 256 }).references(() => supportDepartments.id, { onDelete: "cascade" }).notNull(),
supportTopicId: varchar("support_topic_id", { length: 256 }).references(() => supportTopics.id, { onDelete: "cascade" }).notNull(),
supportStatusId: varchar("support_status_id", { length: 256 }).references(() => supportStatuses.id, { onDelete: "cascade" }).notNull(),
province: varchar("province", { length: 256 }),
grade: varchar("grade", { length: 256 }),
createdAt: timestamp("created_at").notNull().default(sql`now()`),
updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
userId: varchar("user_id", { length: 256 }).notNull(),

### supportTopics

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
supportDepartmentId: varchar("support_department_id", { length: 256 }).references(() => supportDepartments.id, { onDelete: "cascade" }).notNull()
