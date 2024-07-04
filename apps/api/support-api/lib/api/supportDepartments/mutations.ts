import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertSupportDepartmentSchema,
  NewSupportDepartmentParams,
  SupportDepartmentId,
  supportDepartmentIdSchema,
  supportDepartments,
  UpdateSupportDepartmentParams,
  updateSupportDepartmentSchema,
} from "../db/schema/supportDepartments";

export const createSupportDepartment = async (
  supportDepartment: NewSupportDepartmentParams,
) => {
  const { session } = await getUserAuth();
  const newSupportDepartment = insertSupportDepartmentSchema.parse({
    ...supportDepartment,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(supportDepartments)
      .values(newSupportDepartment)
      .returning();
    return { supportDepartment: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSupportDepartment = async (
  id: SupportDepartmentId,
  supportDepartment: UpdateSupportDepartmentParams,
) => {
  const { session } = await getUserAuth();
  const { id: supportDepartmentId } = supportDepartmentIdSchema.parse({ id });
  const newSupportDepartment = updateSupportDepartmentSchema.parse({
    ...supportDepartment,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(supportDepartments)
      .set(newSupportDepartment)
      .where(
        and(
          eq(supportDepartments.id, supportDepartmentId!),
          eq(supportDepartments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { supportDepartment: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSupportDepartment = async (id: SupportDepartmentId) => {
  const { session } = await getUserAuth();
  const { id: supportDepartmentId } = supportDepartmentIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(supportDepartments)
      .where(
        and(
          eq(supportDepartments.id, supportDepartmentId!),
          eq(supportDepartments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { supportDepartment: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
