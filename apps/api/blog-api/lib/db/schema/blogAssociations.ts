import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import type { getBlogAssociations } from "../../api/blogAssociations/queries";
import { blogExternals } from "./blogExternals";

export const blogAssociations = pgTable(
  "blog_associations",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    blogExternalId: varchar("blog_external_id", { length: 256 })
      .references(() => blogExternals.id)
      .notNull(),
    contextId: varchar("context_id", { length: 256 }),
  },
  (blogAssociations) => {
    return {
      blogExternalIdIndex: uniqueIndex("blog_external_id_idx").on(
        blogAssociations.blogExternalId,
      ),
    };
  },
);

// Schema for blogAssociations - used to validate API requests
const baseSchema = createSelectSchema(blogAssociations);

export const insertBlogAssociationSchema = createInsertSchema(blogAssociations);
export const insertBlogAssociationParams = baseSchema
  .extend({
    blogExternalId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateBlogAssociationSchema = baseSchema;
export const updateBlogAssociationParams = baseSchema.extend({
  blogExternalId: z.coerce.string().min(1),
});
export const blogAssociationIdSchema = baseSchema.pick({ id: true });

// Types for blogAssociations - used to type API request params and within Components
export type BlogAssociation = typeof blogAssociations.$inferSelect;
export type NewBlogAssociation = z.infer<typeof insertBlogAssociationSchema>;
export type NewBlogAssociationParams = z.infer<
  typeof insertBlogAssociationParams
>;
export type UpdateBlogAssociationParams = z.infer<
  typeof updateBlogAssociationParams
>;
export type BlogAssociationId = z.infer<typeof blogAssociationIdSchema>["id"];

// this type infers the return from getBlogAssociations() - meaning it will include any joins
export type CompleteBlogAssociation = Awaited<
  ReturnType<typeof getBlogAssociations>
>["blogAssociations"][number];
