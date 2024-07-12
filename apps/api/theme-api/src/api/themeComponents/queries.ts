import type { ThemeComponentId } from "@soco/theme-db/schema/themeComponents";
import { eq } from "@soco/theme-db";
import { db } from "@soco/theme-db/client";
import {
  themeComponentIdSchema,
  themeComponents,
} from "@soco/theme-db/schema/themeComponents";

export const getThemeComponents = async () => {
  const rows = await db.select().from(themeComponents);
  const t = rows;
  return { themeComponents: t };
};

export const getThemeComponentById = async (id: ThemeComponentId) => {
  const { id: themeComponentId } = themeComponentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(themeComponents)
    .where(eq(themeComponents.id, themeComponentId));
  if (row === undefined) return {};
  const t = row;
  return { themeComponent: t };
};
