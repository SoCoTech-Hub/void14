import { db } from "@soco/lti-db/client";
import { and, eq } from "@soco/lti-db";
import { 
  LtiSubmissionId, 
  NewLtiSubmissionParams,
  UpdateLtiSubmissionParams, 
  updateLtiSubmissionSchema,
  insertLtiSubmissionSchema, 
  ltiSubmissions,
  ltiSubmissionIdSchema 
} from "@soco/lti-db/schema/ltiSubmissions";
import { getUserAuth } from "@/lib/auth/utils";

export const createLtiSubmission = async (ltiSubmission: NewLtiSubmissionParams) => {
  const { session } = await getUserAuth();
  const newLtiSubmission = insertLtiSubmissionSchema.parse({ ...ltiSubmission, userId: session?.user.id! });
  try {
    const [l] =  await db.insert(ltiSubmissions).values(newLtiSubmission).returning();
    return { ltiSubmission: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiSubmission = async (id: LtiSubmissionId, ltiSubmission: UpdateLtiSubmissionParams) => {
  const { session } = await getUserAuth();
  const { id: ltiSubmissionId } = ltiSubmissionIdSchema.parse({ id });
  const newLtiSubmission = updateLtiSubmissionSchema.parse({ ...ltiSubmission, userId: session?.user.id! });
  try {
    const [l] =  await db
     .update(ltiSubmissions)
     .set(newLtiSubmission)
     .where(and(eq(ltiSubmissions.id, ltiSubmissionId!), eq(ltiSubmissions.userId, session?.user.id!)))
     .returning();
    return { ltiSubmission: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiSubmission = async (id: LtiSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: ltiSubmissionId } = ltiSubmissionIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(ltiSubmissions).where(and(eq(ltiSubmissions.id, ltiSubmissionId!), eq(ltiSubmissions.userId, session?.user.id!)))
    .returning();
    return { ltiSubmission: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

