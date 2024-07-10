import { db } from "@soco/theme-db/client";
import { eq, and } from "@soco/theme-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type ThemeId, themeIdSchema, themes } from "@soco/theme-db/schema/themes";

export const getThemes = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(themes).where(eq(themes.userId, session?.user.id!));
  const t = rows
  return { themes: t };
};

export const getThemeById = async (id: ThemeId) => {
  const { session } = await getUserAuth();
  const { id: themeId } = themeIdSchema.parse({ id });
  const [row] = await db.select().from(themes).where(and(eq(themes.id, themeId), eq(themes.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { theme: t };
};


