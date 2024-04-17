import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ThemeId, 
  NewThemeParams,
  UpdateThemeParams, 
  updateThemeSchema,
  insertThemeSchema, 
  themes,
  themeIdSchema 
} from "@/lib/db/schema/themes";

export const createTheme = async (theme: NewThemeParams) => {
  const newTheme = insertThemeSchema.parse(theme);
  try {
    const [t] =  await db.insert(themes).values(newTheme).returning();
    return { theme: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTheme = async (id: ThemeId, theme: UpdateThemeParams) => {
  const { id: themeId } = themeIdSchema.parse({ id });
  const newTheme = updateThemeSchema.parse(theme);
  try {
    const [t] =  await db
     .update(themes)
     .set(newTheme)
     .where(eq(themes.id, themeId!))
     .returning();
    return { theme: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTheme = async (id: ThemeId) => {
  const { id: themeId } = themeIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(themes).where(eq(themes.id, themeId!))
    .returning();
    return { theme: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

