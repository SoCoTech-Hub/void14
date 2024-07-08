import { db } from "@soco/module-db/index";
import { eq } from "drizzle-orm";
import { type ModuleId, moduleIdSchema, modules } from "@soco/module-db/schema/modules";

export const getModules = async () => {
  const rows = await db.select().from(modules);
  const m = rows
  return { modules: m };
};

export const getModuleById = async (id: ModuleId) => {
  const { id: moduleId } = moduleIdSchema.parse({ id });
  const [row] = await db.select().from(modules).where(eq(modules.id, moduleId));
  if (row === undefined) return {};
  const m = row;
  return { module: m };
};


