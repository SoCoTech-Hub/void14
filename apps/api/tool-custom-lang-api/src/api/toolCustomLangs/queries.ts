import type { ToolCustomLangId } from "@soco/tool-custom-lang-db/schema/toolCustomLangs";
import { eq } from "@soco/tool-custom-lang-db";
import { db } from "@soco/tool-custom-lang-db/client";
import {
  toolCustomLangIdSchema,
  toolCustomLangs,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangs";

export const getToolCustomLangs = async () => {
  const rows = await db.select().from(toolCustomLangs);
  const t = rows;
  return { toolCustomLangs: t };
};

export const getToolCustomLangById = async (id: ToolCustomLangId) => {
  const { id: toolCustomLangId } = toolCustomLangIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolCustomLangs)
    .where(eq(toolCustomLangs.id, toolCustomLangId));
  if (row === undefined) return {};
  const t = row;
  return { toolCustomLang: t };
};
