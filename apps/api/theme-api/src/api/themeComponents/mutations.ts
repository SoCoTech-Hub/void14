import { db } from "@soco/theme-db/client";
import { eq } from "@soco/theme-db";
import { 
  type ThemeComponentId, 
  type NewThemeComponentParams,
  type UpdateThemeComponentParams, 
  updateThemeComponentSchema,
  insertThemeComponentSchema, 
  themeComponents,
  themeComponentIdSchema 
} from "@soco/theme-db/schema/themeComponents";

export const createThemeComponent = async (themeComponent: NewThemeComponentParams) => {
  const newThemeComponent = insertThemeComponentSchema.parse(themeComponent);
  try {
    const [t] =  await db.insert(themeComponents).values(newThemeComponent).returning();
    return { themeComponent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateThemeComponent = async (id: ThemeComponentId, themeComponent: UpdateThemeComponentParams) => {
  const { id: themeComponentId } = themeComponentIdSchema.parse({ id });
  const newThemeComponent = updateThemeComponentSchema.parse(themeComponent);
  try {
    const [t] =  await db
     .update(themeComponents)
     .set(newThemeComponent)
     .where(eq(themeComponents.id, themeComponentId!))
     .returning();
    return { themeComponent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteThemeComponent = async (id: ThemeComponentId) => {
  const { id: themeComponentId } = themeComponentIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(themeComponents).where(eq(themeComponents.id, themeComponentId!))
    .returning();
    return { themeComponent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

