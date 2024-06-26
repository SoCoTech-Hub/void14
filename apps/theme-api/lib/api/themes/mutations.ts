import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ThemeId, 
  NewThemeParams,
  UpdateThemeParams, 
  updateThemeSchema,
  insertThemeSchema, 
  themes,
  themeIdSchema 
} from "@/lib/db/schema/themes";
import { getUserAuth } from "@/lib/auth/utils";

export const createTheme = async (theme: NewThemeParams) => {
  const { session } = await getUserAuth();
  const newTheme = insertThemeSchema.parse({ ...theme, userId: session?.user.id! });
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
  const { session } = await getUserAuth();
  const { id: themeId } = themeIdSchema.parse({ id });
  const newTheme = updateThemeSchema.parse({ ...theme, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(themes)
     .set({...newTheme, updatedAt: new Date() })
     .where(and(eq(themes.id, themeId!), eq(themes.userId, session?.user.id!)))
     .returning();
    return { theme: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTheme = async (id: ThemeId) => {
  const { session } = await getUserAuth();
  const { id: themeId } = themeIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(themes).where(and(eq(themes.id, themeId!), eq(themes.userId, session?.user.id!)))
    .returning();
    return { theme: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

