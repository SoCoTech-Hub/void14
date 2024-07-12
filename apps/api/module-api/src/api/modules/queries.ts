import type { ModuleId } from "@soco/module-db/schema/modules";
import { eq } from "@soco/module-db";
import { db } from "@soco/module-db/client";
import { moduleIdSchema, modules } from "@soco/module-db/schema/modules";

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
