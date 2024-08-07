import type { ToolCustomLangComponentId } from "@soco/tool-custom-lang-db/schema/toolCustomLangComponents";
import { eq } from "@soco/tool-custom-lang-db";
import { db } from "@soco/tool-custom-lang-db/client";
import {
  toolCustomLangComponentIdSchema,
  toolCustomLangComponents,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangComponents";

export const getToolCustomLangComponents = async () => {
  const rows = await db.select().from(toolCustomLangComponents);
  const t = rows;
  return { toolCustomLangComponents: t };
};

export const getToolCustomLangComponentById = async (
  id: ToolCustomLangComponentId,
) => {
  const { id: toolCustomLangComponentId } =
    toolCustomLangComponentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolCustomLangComponents)
    .where(eq(toolCustomLangComponents.id, toolCustomLangComponentId));
  if (row === undefined) return {};
  const t = row;
  return { toolCustomLangComponent: t };
};
