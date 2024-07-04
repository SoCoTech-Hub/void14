import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  EnrolLtiDeploymentId,
  enrolLtiDeploymentIdSchema,
  enrolLtiDeployments,
  insertEnrolLtiDeploymentSchema,
  NewEnrolLtiDeploymentParams,
  UpdateEnrolLtiDeploymentParams,
  updateEnrolLtiDeploymentSchema,
} from "../db/schema/enrolLtiDeployments";

export const createEnrolLtiDeployment = async (
  enrolLtiDeployment: NewEnrolLtiDeploymentParams,
) => {
  const newEnrolLtiDeployment =
    insertEnrolLtiDeploymentSchema.parse(enrolLtiDeployment);
  try {
    const [e] = await db
      .insert(enrolLtiDeployments)
      .values(newEnrolLtiDeployment)
      .returning();
    return { enrolLtiDeployment: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiDeployment = async (
  id: EnrolLtiDeploymentId,
  enrolLtiDeployment: UpdateEnrolLtiDeploymentParams,
) => {
  const { id: enrolLtiDeploymentId } = enrolLtiDeploymentIdSchema.parse({ id });
  const newEnrolLtiDeployment =
    updateEnrolLtiDeploymentSchema.parse(enrolLtiDeployment);
  try {
    const [e] = await db
      .update(enrolLtiDeployments)
      .set({ ...newEnrolLtiDeployment, updatedAt: new Date() })
      .where(eq(enrolLtiDeployments.id, enrolLtiDeploymentId!))
      .returning();
    return { enrolLtiDeployment: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiDeployment = async (id: EnrolLtiDeploymentId) => {
  const { id: enrolLtiDeploymentId } = enrolLtiDeploymentIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(enrolLtiDeployments)
      .where(eq(enrolLtiDeployments.id, enrolLtiDeploymentId!))
      .returning();
    return { enrolLtiDeployment: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
