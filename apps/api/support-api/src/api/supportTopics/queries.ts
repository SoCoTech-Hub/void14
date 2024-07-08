import { db } from "@soco/support-db/index";
import { eq } from "drizzle-orm";
import { type SupportTopicId, supportTopicIdSchema, supportTopics } from "@soco/support-db/schema/supportTopics";
import { supportDepartments } from "@soco/support-db/schema/supportDepartments";

export const getSupportTopics = async () => {
  const rows = await db.select({ supportTopic: supportTopics, supportDepartment: supportDepartments }).from(supportTopics).leftJoin(supportDepartments, eq(supportTopics.supportDepartmentId, supportDepartments.id));
  const s = rows .map((r) => ({ ...r.supportTopic, supportDepartment: r.supportDepartment})); 
  return { supportTopics: s };
};

export const getSupportTopicById = async (id: SupportTopicId) => {
  const { id: supportTopicId } = supportTopicIdSchema.parse({ id });
  const [row] = await db.select({ supportTopic: supportTopics, supportDepartment: supportDepartments }).from(supportTopics).where(eq(supportTopics.id, supportTopicId)).leftJoin(supportDepartments, eq(supportTopics.supportDepartmentId, supportDepartments.id));
  if (row === undefined) return {};
  const s =  { ...row.supportTopic, supportDepartment: row.supportDepartment } ;
  return { supportTopic: s };
};


