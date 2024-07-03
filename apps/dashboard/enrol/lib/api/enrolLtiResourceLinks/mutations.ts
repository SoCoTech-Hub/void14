import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  EnrolLtiResourceLinkId, 
  NewEnrolLtiResourceLinkParams,
  UpdateEnrolLtiResourceLinkParams, 
  updateEnrolLtiResourceLinkSchema,
  insertEnrolLtiResourceLinkSchema, 
  enrolLtiResourceLinks,
  enrolLtiResourceLinkIdSchema 
} from "@/lib/db/schema/enrolLtiResourceLinks";

export const createEnrolLtiResourceLink = async (enrolLtiResourceLink: NewEnrolLtiResourceLinkParams) => {
  const newEnrolLtiResourceLink = insertEnrolLtiResourceLinkSchema.parse(enrolLtiResourceLink);
  try {
    const [e] =  await db.insert(enrolLtiResourceLinks).values(newEnrolLtiResourceLink).returning();
    return { enrolLtiResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiResourceLink = async (id: EnrolLtiResourceLinkId, enrolLtiResourceLink: UpdateEnrolLtiResourceLinkParams) => {
  const { id: enrolLtiResourceLinkId } = enrolLtiResourceLinkIdSchema.parse({ id });
  const newEnrolLtiResourceLink = updateEnrolLtiResourceLinkSchema.parse(enrolLtiResourceLink);
  try {
    const [e] =  await db
     .update(enrolLtiResourceLinks)
     .set({...newEnrolLtiResourceLink, updatedAt: new Date() })
     .where(eq(enrolLtiResourceLinks.id, enrolLtiResourceLinkId!))
     .returning();
    return { enrolLtiResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiResourceLink = async (id: EnrolLtiResourceLinkId) => {
  const { id: enrolLtiResourceLinkId } = enrolLtiResourceLinkIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiResourceLinks).where(eq(enrolLtiResourceLinks.id, enrolLtiResourceLinkId!))
    .returning();
    return { enrolLtiResourceLink: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

