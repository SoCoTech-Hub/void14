import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  EnrolLtiToolId,
  enrolLtiToolIdSchema,
  enrolLtiTools,
  insertEnrolLtiToolSchema,
  NewEnrolLtiToolParams,
  UpdateEnrolLtiToolParams,
  updateEnrolLtiToolSchema,
} from "../../db/schema/enrolLtiTools";

export const createEnrolLtiTool = async (
  enrolLtiTool: NewEnrolLtiToolParams,
) => {
  const newEnrolLtiTool = insertEnrolLtiToolSchema.parse(enrolLtiTool);
  try {
    const [e] = await db
      .insert(enrolLtiTools)
      .values(newEnrolLtiTool)
      .returning();
    return { enrolLtiTool: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiTool = async (
  id: EnrolLtiToolId,
  enrolLtiTool: UpdateEnrolLtiToolParams,
) => {
  const { id: enrolLtiToolId } = enrolLtiToolIdSchema.parse({ id });
  const newEnrolLtiTool = updateEnrolLtiToolSchema.parse(enrolLtiTool);
  try {
    const [e] = await db
      .update(enrolLtiTools)
      .set({ ...newEnrolLtiTool, updatedAt: new Date() })
      .where(eq(enrolLtiTools.id, enrolLtiToolId!))
      .returning();
    return { enrolLtiTool: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiTool = async (id: EnrolLtiToolId) => {
  const { id: enrolLtiToolId } = enrolLtiToolIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(enrolLtiTools)
      .where(eq(enrolLtiTools.id, enrolLtiToolId!))
      .returning();
    return { enrolLtiTool: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
