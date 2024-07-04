import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { UserPreferenceId } from "../db/schema/userPreferences";
import { db } from "../db/index";
import {
  userPreferenceIdSchema,
  userPreferences,
} from "../db/schema/userPreferences";

export const getUserPreferences = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, session?.user.id!));
  const u = rows;
  return { userPreferences: u };
};

export const getUserPreferenceById = async (id: UserPreferenceId) => {
  const { session } = await getUserAuth();
  const { id: userPreferenceId } = userPreferenceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userPreferences)
    .where(
      and(
        eq(userPreferences.id, userPreferenceId),
        eq(userPreferences.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userPreference: u };
};
