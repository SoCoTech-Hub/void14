import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type H5pLibraryDependencyId, 
  type NewH5pLibraryDependencyParams,
  type UpdateH5pLibraryDependencyParams, 
  updateH5pLibraryDependencySchema,
  insertH5pLibraryDependencySchema, 
  h5pLibraryDependencies,
  h5pLibraryDependencyIdSchema 
} from "@/lib/db/schema/h5pLibraryDependencies";

export const createH5pLibraryDependency = async (h5pLibraryDependency: NewH5pLibraryDependencyParams) => {
  const newH5pLibraryDependency = insertH5pLibraryDependencySchema.parse(h5pLibraryDependency);
  try {
    const [h] =  await db.insert(h5pLibraryDependencies).values(newH5pLibraryDependency).returning();
    return { h5pLibraryDependency: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pLibraryDependency = async (id: H5pLibraryDependencyId, h5pLibraryDependency: UpdateH5pLibraryDependencyParams) => {
  const { id: h5pLibraryDependencyId } = h5pLibraryDependencyIdSchema.parse({ id });
  const newH5pLibraryDependency = updateH5pLibraryDependencySchema.parse(h5pLibraryDependency);
  try {
    const [h] =  await db
     .update(h5pLibraryDependencies)
     .set(newH5pLibraryDependency)
     .where(eq(h5pLibraryDependencies.id, h5pLibraryDependencyId!))
     .returning();
    return { h5pLibraryDependency: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pLibraryDependency = async (id: H5pLibraryDependencyId) => {
  const { id: h5pLibraryDependencyId } = h5pLibraryDependencyIdSchema.parse({ id });
  try {
    const [h] =  await db.delete(h5pLibraryDependencies).where(eq(h5pLibraryDependencies.id, h5pLibraryDependencyId!))
    .returning();
    return { h5pLibraryDependency: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

