import type {
  NewThemeComponentStyleParams,
  ThemeComponentStyleId,
  UpdateThemeComponentStyleParams,
} from "@soco/theme-db/schema/themeComponentStyles";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/theme-db";
import { db } from "@soco/theme-db/client";
import {
  insertThemeComponentStyleSchema,
  themeComponentStyleIdSchema,
  themeComponentStyles,
  updateThemeComponentStyleSchema,
} from "@soco/theme-db/schema/themeComponentStyles";

export const createThemeComponentStyle = async (
  themeComponentStyle: NewThemeComponentStyleParams,
) => {
  const { session } = await getUserAuth();
  const newThemeComponentStyle = insertThemeComponentStyleSchema.parse({
    ...themeComponentStyle,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(themeComponentStyles)
      .values(newThemeComponentStyle)
      .returning();
    return { themeComponentStyle: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateThemeComponentStyle = async (
  id: ThemeComponentStyleId,
  themeComponentStyle: UpdateThemeComponentStyleParams,
) => {
  const { session } = await getUserAuth();
  const { id: themeComponentStyleId } = themeComponentStyleIdSchema.parse({
    id,
  });
  const newThemeComponentStyle = updateThemeComponentStyleSchema.parse({
    ...themeComponentStyle,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(themeComponentStyles)
      .set({ ...newThemeComponentStyle, updatedAt: new Date() })
      .where(
        and(
          eq(themeComponentStyles.id, themeComponentStyleId!),
          eq(themeComponentStyles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { themeComponentStyle: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteThemeComponentStyle = async (id: ThemeComponentStyleId) => {
  const { session } = await getUserAuth();
  const { id: themeComponentStyleId } = themeComponentStyleIdSchema.parse({
    id,
  });
  try {
    const [t] = await db
      .delete(themeComponentStyles)
      .where(
        and(
          eq(themeComponentStyles.id, themeComponentStyleId!),
          eq(themeComponentStyles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { themeComponentStyle: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
