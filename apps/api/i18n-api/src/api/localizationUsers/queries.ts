import type { LocalizationUserId } from "@soco/i18n-db/schema/localizationUsers";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/i18n-db";
import { db } from "@soco/i18n-db/client";
import { localizationLanguages } from "@soco/i18n-db/schema/localizationLanguages";
import {
  localizationUserIdSchema,
  localizationUsers,
} from "@soco/i18n-db/schema/localizationUsers";

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
