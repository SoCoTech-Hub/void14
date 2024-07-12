import type { UserInfoFieldId } from "@soco/user-db/schema/userInfoFields";
import { eq } from "@soco/user-db";
import { db } from "@soco/user-db/client";
import {
  userInfoFieldIdSchema,
  userInfoFields,
} from "@soco/user-db/schema/userInfoFields";

export const getUserInfoFields = async () => {
  const rows = await db.select().from(userInfoFields);
  const u = rows;
  return { userInfoFields: u };
};

export const getUserInfoFieldById = async (id: UserInfoFieldId) => {
  const { id: userInfoFieldId } = userInfoFieldIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userInfoFields)
    .where(eq(userInfoFields.id, userInfoFieldId));
  if (row === undefined) return {};
  const u = row;
  return { userInfoField: u };
};
