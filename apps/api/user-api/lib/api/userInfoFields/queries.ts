import { eq } from "drizzle-orm";

import type { UserInfoFieldId } from "../db/schema/userInfoFields";
import { db } from "../db/index";
import {
  userInfoFieldIdSchema,
  userInfoFields,
} from "../db/schema/userInfoFields";

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
