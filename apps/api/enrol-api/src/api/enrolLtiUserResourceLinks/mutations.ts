import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { 
  EnrolLtiUserResourceLinkId, 
  NewEnrolLtiUserResourceLinkParams,
  UpdateEnrolLtiUserResourceLinkParams, 
  updateEnrolLtiUserResourceLinkSchema,
  insertEnrolLtiUserResourceLinkSchema, 
  enrolLtiUserResourceLinks,
  enrolLtiUserResourceLinkIdSchema 
} from "@soco/enrol-db/schema/enrolLtiUserResourceLinks";

export const createEnrolLtiUserResourceLink = async (enrolLtiUserResourceLink: NewEnrolLtiUserResourceLinkParams) => {
  const newEnrolLtiUserResourceLink = insertEnrolLtiUserResourceLinkSchema.parse(enrolLtiUserResourceLink);
  try {
    const [e] =  await db.insert(enrolLtiUserResourceLinks).values(newEnrolLtiUserResourceLink).returning();
    return { enrolLtiUserResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiUserResourceLink = async (id: EnrolLtiUserResourceLinkId, enrolLtiUserResourceLink: UpdateEnrolLtiUserResourceLinkParams) => {
  const { id: enrolLtiUserResourceLinkId } = enrolLtiUserResourceLinkIdSchema.parse({ id });
  const newEnrolLtiUserResourceLink = updateEnrolLtiUserResourceLinkSchema.parse(enrolLtiUserResourceLink);
  try {
    const [e] =  await db
     .update(enrolLtiUserResourceLinks)
     .set(newEnrolLtiUserResourceLink)
     .where(eq(enrolLtiUserResourceLinks.id, enrolLtiUserResourceLinkId!))
     .returning();
    return { enrolLtiUserResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiUserResourceLink = async (id: EnrolLtiUserResourceLinkId) => {
  const { id: enrolLtiUserResourceLinkId } = enrolLtiUserResourceLinkIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiUserResourceLinks).where(eq(enrolLtiUserResourceLinks.id, enrolLtiUserResourceLinkId!))
    .returning();
    return { enrolLtiUserResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

