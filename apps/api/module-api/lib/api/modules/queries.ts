import { eq } from "drizzle-orm";

import type { ModuleId } from "../../db/schema/modules";
import { db } from "../../db/index";
import { moduleIdSchema, modules } from "../../db/schema/modules";

export const getModules = async () => {
  const rows = await db.select().from(modules);
  const m = rows;
  return { modules: m };
};

export const getModuleById = async (id: ModuleId) => {
  const { id: moduleId } = moduleIdSchema.parse({ id });
  const [row] = await db.select().from(modules).where(eq(modules.id, moduleId));
  if (row === undefined) return {};
  const m = row;
  return { module: m };
};
