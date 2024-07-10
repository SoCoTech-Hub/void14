import { db } from "@soco/support-db/client";
import { eq, and } from "@soco/support-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type SupportDepartmentId, supportDepartmentIdSchema, supportDepartments } from "@soco/support-db/schema/supportDepartments";

export const getSupportDepartments = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(supportDepartments).where(eq(supportDepartments.userId, session?.user.id!));
  const s = rows
  return { supportDepartments: s };
};

export const getSupportDepartmentById = async (id: SupportDepartmentId) => {
  const { session } = await getUserAuth();
  const { id: supportDepartmentId } = supportDepartmentIdSchema.parse({ id });
  const [row] = await db.select().from(supportDepartments).where(and(eq(supportDepartments.id, supportDepartmentId), eq(supportDepartments.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { supportDepartment: s };
};


