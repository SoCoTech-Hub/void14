import { eq } from "drizzle-orm";

import type { WorkshopFormCommentId } from "../db/schema/workshopFormComments";
import { db } from "../db/index";
import {
  workshopFormCommentIdSchema,
  workshopFormComments,
} from "../db/schema/workshopFormComments";
import { workshops } from "../db/schema/workshops";

export const getWorkshopFormComments = async () => {
  const rows = await db
    .select({ workshopFormComment: workshopFormComments, workshop: workshops })
    .from(workshopFormComments)
    .leftJoin(workshops, eq(workshopFormComments.workshopId, workshops.id));
  const w = rows.map((r) => ({
    ...r.workshopFormComment,
    workshop: r.workshop,
  }));
  return { workshopFormComments: w };
};

export const getWorkshopFormCommentById = async (id: WorkshopFormCommentId) => {
  const { id: workshopFormCommentId } = workshopFormCommentIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({ workshopFormComment: workshopFormComments, workshop: workshops })
    .from(workshopFormComments)
    .where(eq(workshopFormComments.id, workshopFormCommentId))
    .leftJoin(workshops, eq(workshopFormComments.workshopId, workshops.id));
  if (row === undefined) return {};
  const w = { ...row.workshopFormComment, workshop: row.workshop };
  return { workshopFormComment: w };
};
