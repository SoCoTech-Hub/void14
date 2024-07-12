import type { SupportTopicId } from "@soco/support-db/schema/supportTopics";
import { eq } from "@soco/support-db";
import { db } from "@soco/support-db/client";
import { supportDepartments } from "@soco/support-db/schema/supportDepartments";
import {
  supportTopicIdSchema,
  supportTopics,
} from "@soco/support-db/schema/supportTopics";

export const getSupportTopics = async () => {
  const rows = await db
    .select({
      supportTopic: supportTopics,
      supportDepartment: supportDepartments,
    })
    .from(supportTopics)
    .leftJoin(
      supportDepartments,
      eq(supportTopics.supportDepartmentId, supportDepartments.id),
    );
  const s = rows.map((r) => ({
    ...r.supportTopic,
    supportDepartment: r.supportDepartment,
  }));
  return { supportTopics: s };
};

export const getSupportTopicById = async (id: SupportTopicId) => {
  const { id: supportTopicId } = supportTopicIdSchema.parse({ id });
  const [row] = await db
    .select({
      supportTopic: supportTopics,
      supportDepartment: supportDepartments,
    })
    .from(supportTopics)
    .where(eq(supportTopics.id, supportTopicId))
    .leftJoin(
      supportDepartments,
      eq(supportTopics.supportDepartmentId, supportDepartments.id),
    );
  if (row === undefined) return {};
  const s = { ...row.supportTopic, supportDepartment: row.supportDepartment };
  return { supportTopic: s };
};
