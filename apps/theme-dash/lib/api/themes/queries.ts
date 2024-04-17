import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ThemeId, themeIdSchema, themes } from "@/lib/db/schema/themes";

export const getThemes = async () => {
  const rows = await db.select().from(themes);
  const t = rows
  return { themes: t };
};

export const getThemeById = async (id: ThemeId) => {
  const { id: themeId } = themeIdSchema.parse({ id });
  const [row] = await db.select().from(themes).where(eq(themes.id, themeId));
  if (row === undefined) return {};
  const t = row;
  return { theme: t };
};


