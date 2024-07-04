import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertLtiserviceGradebookserviceSchema,
  LtiserviceGradebookserviceId,
  ltiserviceGradebookserviceIdSchema,
  ltiserviceGradebookservices,
  NewLtiserviceGradebookserviceParams,
  UpdateLtiserviceGradebookserviceParams,
  updateLtiserviceGradebookserviceSchema,
} from "../db/schema/ltiserviceGradebookservices";

export const createLtiserviceGradebookservice = async (
  ltiserviceGradebookservice: NewLtiserviceGradebookserviceParams,
) => {
  const newLtiserviceGradebookservice =
    insertLtiserviceGradebookserviceSchema.parse(ltiserviceGradebookservice);
  try {
    const [l] = await db
      .insert(ltiserviceGradebookservices)
      .values(newLtiserviceGradebookservice)
      .returning();
    return { ltiserviceGradebookservice: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiserviceGradebookservice = async (
  id: LtiserviceGradebookserviceId,
  ltiserviceGradebookservice: UpdateLtiserviceGradebookserviceParams,
) => {
  const { id: ltiserviceGradebookserviceId } =
    ltiserviceGradebookserviceIdSchema.parse({ id });
  const newLtiserviceGradebookservice =
    updateLtiserviceGradebookserviceSchema.parse(ltiserviceGradebookservice);
  try {
    const [l] = await db
      .update(ltiserviceGradebookservices)
      .set(newLtiserviceGradebookservice)
      .where(eq(ltiserviceGradebookservices.id, ltiserviceGradebookserviceId!))
      .returning();
    return { ltiserviceGradebookservice: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiserviceGradebookservice = async (
  id: LtiserviceGradebookserviceId,
) => {
  const { id: ltiserviceGradebookserviceId } =
    ltiserviceGradebookserviceIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(ltiserviceGradebookservices)
      .where(eq(ltiserviceGradebookservices.id, ltiserviceGradebookserviceId!))
      .returning();
    return { ltiserviceGradebookservice: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
