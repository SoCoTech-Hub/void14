import { db } from "@soco/support-db/client";
import { eq } from "@soco/support-db";
import { 
  type SupportTopicId, 
  type NewSupportTopicParams,
  type UpdateSupportTopicParams, 
  updateSupportTopicSchema,
  insertSupportTopicSchema, 
  supportTopics,
  supportTopicIdSchema 
} from "@soco/support-db/schema/supportTopics";

export const createSupportTopic = async (supportTopic: NewSupportTopicParams) => {
  const newSupportTopic = insertSupportTopicSchema.parse(supportTopic);
  try {
    const [s] =  await db.insert(supportTopics).values(newSupportTopic).returning();
    return { supportTopic: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSupportTopic = async (id: SupportTopicId, supportTopic: UpdateSupportTopicParams) => {
  const { id: supportTopicId } = supportTopicIdSchema.parse({ id });
  const newSupportTopic = updateSupportTopicSchema.parse(supportTopic);
  try {
    const [s] =  await db
     .update(supportTopics)
     .set(newSupportTopic)
     .where(eq(supportTopics.id, supportTopicId!))
     .returning();
    return { supportTopic: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSupportTopic = async (id: SupportTopicId) => {
  const { id: supportTopicId } = supportTopicIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(supportTopics).where(eq(supportTopics.id, supportTopicId!))
    .returning();
    return { supportTopic: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

