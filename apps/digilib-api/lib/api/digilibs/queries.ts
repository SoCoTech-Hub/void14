import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type DigilibId, digilibIdSchema, digilibs } from "@/lib/db/schema/digilibs";
import { digilibCategories } from "@/lib/db/schema/digilibCategories";

export const getDigilibs = async () => {
  const rows = await db.select({ digilib: digilibs, digilibCategory: digilibCategories }).from(digilibs).leftJoin(digilibCategories, eq(digilibs.digilibCategoryId, digilibCategories.id));
  const d = rows .map((r) => ({ ...r.digilib, digilibCategory: r.digilibCategory})); 
  return { digilibs: d };
};

export const getDigilibById = async (id: DigilibId) => {
  const { id: digilibId } = digilibIdSchema.parse({ id });
  const [row] = await db.select({ digilib: digilibs, digilibCategory: digilibCategories }).from(digilibs).where(eq(digilibs.id, digilibId)).leftJoin(digilibCategories, eq(digilibs.digilibCategoryId, digilibCategories.id));
  if (row === undefined) return {};
  const d =  { ...row.digilib, digilibCategory: row.digilibCategory } ;
  return { digilib: d };
};


