import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  BlogAssociationId, 
  NewBlogAssociationParams,
  UpdateBlogAssociationParams, 
  updateBlogAssociationSchema,
  insertBlogAssociationSchema, 
  blogAssociations,
  blogAssociationIdSchema 
} from "@/lib/db/schema/blogAssociations";

export const createBlogAssociation = async (blogAssociation: NewBlogAssociationParams) => {
  const newBlogAssociation = insertBlogAssociationSchema.parse(blogAssociation);
  try {
    const [b] =  await db.insert(blogAssociations).values(newBlogAssociation).returning();
    return { blogAssociation: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlogAssociation = async (id: BlogAssociationId, blogAssociation: UpdateBlogAssociationParams) => {
  const { id: blogAssociationId } = blogAssociationIdSchema.parse({ id });
  const newBlogAssociation = updateBlogAssociationSchema.parse(blogAssociation);
  try {
    const [b] =  await db
     .update(blogAssociations)
     .set(newBlogAssociation)
     .where(eq(blogAssociations.id, blogAssociationId!))
     .returning();
    return { blogAssociation: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlogAssociation = async (id: BlogAssociationId) => {
  const { id: blogAssociationId } = blogAssociationIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(blogAssociations).where(eq(blogAssociations.id, blogAssociationId!))
    .returning();
    return { blogAssociation: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

