import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { WorkshopFormRubricId } from "../db/schema/workshopFormRubrics";
import { db } from "../db/index";
import {
  workshopFormRubricIdSchema,
  workshopFormRubrics,
} from "../db/schema/workshopFormRubrics";
import { workshops } from "../db/schema/workshops";

export const getWorkshopFormRubrics = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ workshopFormRubric: workshopFormRubrics, workshop: workshops })
    .from(workshopFormRubrics)
    .leftJoin(workshops, eq(workshopFormRubrics.workshopId, workshops.id))
    .where(eq(workshopFormRubrics.userId, session?.user.id!));
  const w = rows.map((r) => ({
    ...r.workshopFormRubric,
    workshop: r.workshop,
  }));
  return { workshopFormRubrics: w };
};

export const getWorkshopFormRubricById = async (id: WorkshopFormRubricId) => {
  const { session } = await getUserAuth();
  const { id: workshopFormRubricId } = workshopFormRubricIdSchema.parse({ id });
  const [row] = await db
    .select({ workshopFormRubric: workshopFormRubrics, workshop: workshops })
    .from(workshopFormRubrics)
    .where(
      and(
        eq(workshopFormRubrics.id, workshopFormRubricId),
        eq(workshopFormRubrics.userId, session?.user.id!),
      ),
    )
    .leftJoin(workshops, eq(workshopFormRubrics.workshopId, workshops.id));
  if (row === undefined) return {};
  const w = { ...row.workshopFormRubric, workshop: row.workshop };
  return { workshopFormRubric: w };
};
