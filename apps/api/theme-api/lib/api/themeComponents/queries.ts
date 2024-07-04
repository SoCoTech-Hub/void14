import { eq } from "drizzle-orm";

import type { ThemeComponentId } from "../db/schema/themeComponents";
import { db } from "../db/index";
import {
  themeComponentIdSchema,
  themeComponents,
} from "../db/schema/themeComponents";

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
