import type {
  EnrolLtiLti2ResourceLinkId,
  NewEnrolLtiLti2ResourceLinkParams,
  UpdateEnrolLtiLti2ResourceLinkParams,
} from "@soco/enrol-db/schema/enrolLtiLti2ResourceLinks";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiLti2ResourceLinkIdSchema,
  enrolLtiLti2ResourceLinks,
  insertEnrolLtiLti2ResourceLinkSchema,
  updateEnrolLtiLti2ResourceLinkSchema,
} from "@soco/enrol-db/schema/enrolLtiLti2ResourceLinks";

export const createEnrolLtiLti2ResourceLink = async (
  enrolLtiLti2ResourceLink: NewEnrolLtiLti2ResourceLinkParams,
) => {
  const newEnrolLtiLti2ResourceLink =
    insertEnrolLtiLti2ResourceLinkSchema.parse(enrolLtiLti2ResourceLink);
  try {
    const [e] = await db
      .insert(enrolLtiLti2ResourceLinks)
      .values(newEnrolLtiLti2ResourceLink)
      .returning();
    return { enrolLtiLti2ResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2ResourceLink = async (
  id: EnrolLtiLti2ResourceLinkId,
  enrolLtiLti2ResourceLink: UpdateEnrolLtiLti2ResourceLinkParams,
) => {
  const { id: enrolLtiLti2ResourceLinkId } =
    enrolLtiLti2ResourceLinkIdSchema.parse({ id });
  const newEnrolLtiLti2ResourceLink =
    updateEnrolLtiLti2ResourceLinkSchema.parse(enrolLtiLti2ResourceLink);
  try {
    const [e] = await db
      .update(enrolLtiLti2ResourceLinks)
      .set({ ...newEnrolLtiLti2ResourceLink, updatedAt: new Date() })
      .where(eq(enrolLtiLti2ResourceLinks.id, enrolLtiLti2ResourceLinkId!))
      .returning();
    return { enrolLtiLti2ResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2ResourceLink = async (
  id: EnrolLtiLti2ResourceLinkId,
) => {
  const { id: enrolLtiLti2ResourceLinkId } =
    enrolLtiLti2ResourceLinkIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(enrolLtiLti2ResourceLinks)
      .where(eq(enrolLtiLti2ResourceLinks.id, enrolLtiLti2ResourceLinkId!))
      .returning();
    return { enrolLtiLti2ResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
