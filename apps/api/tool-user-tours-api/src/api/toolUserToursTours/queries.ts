import { db } from "@soco/tool-user-tours-db/index";
import { eq } from "drizzle-orm";
import { type ToolUserToursTourId, toolUserToursTourIdSchema, toolUserToursTours } from "@soco/tool-user-tours-db/schema/toolUserToursTours";

export const getToolUserToursTours = async () => {
  const rows = await db.select().from(toolUserToursTours);
  const t = rows
  return { toolUserToursTours: t };
};

export const getToolUserToursTourById = async (id: ToolUserToursTourId) => {
  const { id: toolUserToursTourId } = toolUserToursTourIdSchema.parse({ id });
  const [row] = await db.select().from(toolUserToursTours).where(eq(toolUserToursTours.id, toolUserToursTourId));
  if (row === undefined) return {};
  const t = row;
  return { toolUserToursTour: t };
};


