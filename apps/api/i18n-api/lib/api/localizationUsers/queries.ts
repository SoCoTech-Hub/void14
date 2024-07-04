import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { LocalizationUserId } from "../db/schema/localizationUsers";
import { db } from "../db/index";
import { localizationLanguages } from "../db/schema/localizationLanguages";
import {
  localizationUserIdSchema,
  localizationUsers,
} from "../db/schema/localizationUsers";

export const getLocalizationUsers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      localizationUser: localizationUsers,
      localizationLanguage: localizationLanguages,
    })
    .from(localizationUsers)
    .leftJoin(
      localizationLanguages,
      eq(localizationUsers.localizationLanguageId, localizationLanguages.id),
    )
    .where(eq(localizationUsers.userId, session?.user.id!));
  const l = rows.map((r) => ({
    ...r.localizationUser,
    localizationLanguage: r.localizationLanguage,
  }));
  return { localizationUsers: l };
};

export const getLocalizationUserById = async (id: LocalizationUserId) => {
  const { session } = await getUserAuth();
  const { id: localizationUserId } = localizationUserIdSchema.parse({ id });
  const [row] = await db
    .select({
      localizationUser: localizationUsers,
      localizationLanguage: localizationLanguages,
    })
    .from(localizationUsers)
    .where(
      and(
        eq(localizationUsers.id, localizationUserId),
        eq(localizationUsers.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      localizationLanguages,
      eq(localizationUsers.localizationLanguageId, localizationLanguages.id),
    );
  if (row === undefined) return {};
  const l = {
    ...row.localizationUser,
    localizationLanguage: row.localizationLanguage,
  };
  return { localizationUser: l };
};