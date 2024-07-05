import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertLogDisplaySchema,
  LogDisplayId,
  logDisplayIdSchema,
  logDisplays,
  NewLogDisplayParams,
  UpdateLogDisplayParams,
  updateLogDisplaySchema,
} from "../../db/schema/logDisplays";

export const createLogDisplay = async (logDisplay: NewLogDisplayParams) => {
  const newLogDisplay = insertLogDisplaySchema.parse(logDisplay);
  try {
    const [l] = await db.insert(logDisplays).values(newLogDisplay).returning();
    return { logDisplay: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLogDisplay = async (
  id: LogDisplayId,
  logDisplay: UpdateLogDisplayParams,
) => {
  const { id: logDisplayId } = logDisplayIdSchema.parse({ id });
  const newLogDisplay = updateLogDisplaySchema.parse(logDisplay);
  try {
    const [l] = await db
      .update(logDisplays)
      .set(newLogDisplay)
      .where(eq(logDisplays.id, logDisplayId!))
      .returning();
    return { logDisplay: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLogDisplay = async (id: LogDisplayId) => {
  const { id: logDisplayId } = logDisplayIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(logDisplays)
      .where(eq(logDisplays.id, logDisplayId!))
      .returning();
    return { logDisplay: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
