import { db } from "@soco/theme-db/client";
import { eq, and } from "@soco/theme-db";
import { getUserAuth } from "@soco/auth-service";
import { type ThemeComponentStyleId, themeComponentStyleIdSchema, themeComponentStyles } from "@soco/theme-db/schema/themeComponentStyles";
import { themes } from "@soco/theme-db/schema/themes";
import { themeComponents } from "@soco/theme-db/schema/themeComponents";

export const getThemeComponentStyles = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ themeComponentStyle: themeComponentStyles, theme: themes, themeComponent: themeComponents }).from(themeComponentStyles).leftJoin(themes, eq(themeComponentStyles.themeId, themes.id)).leftJoin(themeComponents, eq(themeComponentStyles.themeComponentId, themeComponents.id)).where(eq(themeComponentStyles.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.themeComponentStyle, theme: r.theme, themeComponent: r.themeComponent})); 
  return { themeComponentStyles: t };
};

export const getThemeComponentStyleById = async (id: ThemeComponentStyleId) => {
  const { session } = await getUserAuth();
  const { id: themeComponentStyleId } = themeComponentStyleIdSchema.parse({ id });
  const [row] = await db.select({ themeComponentStyle: themeComponentStyles, theme: themes, themeComponent: themeComponents }).from(themeComponentStyles).where(and(eq(themeComponentStyles.id, themeComponentStyleId), eq(themeComponentStyles.userId, session?.user.id!))).leftJoin(themes, eq(themeComponentStyles.themeId, themes.id)).leftJoin(themeComponents, eq(themeComponentStyles.themeComponentId, themeComponents.id));
  if (row === undefined) return {};
  const t =  { ...row.themeComponentStyle, theme: row.theme, themeComponent: row.themeComponent } ;
  return { themeComponentStyle: t };
};


