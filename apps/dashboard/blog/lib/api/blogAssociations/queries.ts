import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BlogAssociationId, blogAssociationIdSchema, blogAssociations } from "@/lib/db/schema/blogAssociations";
import { blogExternals } from "@/lib/db/schema/blogExternals";

export const getBlogAssociations = async () => {
  const rows = await db.select({ blogAssociation: blogAssociations, blogExternal: blogExternals }).from(blogAssociations).leftJoin(blogExternals, eq(blogAssociations.blogExternalId, blogExternals.id));
  const b = rows .map((r) => ({ ...r.blogAssociation, blogExternal: r.blogExternal})); 
  return { blogAssociations: b };
};

export const getBlogAssociationById = async (id: BlogAssociationId) => {
  const { id: blogAssociationId } = blogAssociationIdSchema.parse({ id });
  const [row] = await db.select({ blogAssociation: blogAssociations, blogExternal: blogExternals }).from(blogAssociations).where(eq(blogAssociations.id, blogAssociationId)).leftJoin(blogExternals, eq(blogAssociations.blogExternalId, blogExternals.id));
  if (row === undefined) return {};
  const b =  { ...row.blogAssociation, blogExternal: row.blogExternal } ;
  return { blogAssociation: b };
};


