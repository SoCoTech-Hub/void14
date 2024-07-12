import type {
  ModuleId,
  NewModuleParams,
  UpdateModuleParams,
} from "@soco/module-db/schema/modules";
import { eq } from "@soco/module-db";
import { db } from "@soco/module-db/client";
import {
  insertModuleSchema,
  moduleIdSchema,
  modules,
  updateModuleSchema,
} from "@soco/module-db/schema/modules";

export const createModule = async (module: NewModuleParams) => {
  const newModule = insertModuleSchema.parse(module);
  try {
    const [m] = await db.insert(modules).values(newModule).returning();
    return { module: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateModule = async (
  id: ModuleId,
  module: UpdateModuleParams,
) => {
  const { id: moduleId } = moduleIdSchema.parse({ id });
  const newModule = updateModuleSchema.parse(module);
  try {
    const [m] = await db
      .update(modules)
      .set(newModule)
      .where(eq(modules.id, moduleId!))
      .returning();
    return { module: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteModule = async (id: ModuleId) => {
  const { id: moduleId } = moduleIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(modules)
      .where(eq(modules.id, moduleId!))
      .returning();
    return { module: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
