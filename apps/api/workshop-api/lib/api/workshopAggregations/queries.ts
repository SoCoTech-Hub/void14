import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { WorkshopAggregationId } from "../db/schema/workshopAggregations";
import { db } from "../db/index";
import {
  workshopAggregationIdSchema,
  workshopAggregations,
} from "../db/schema/workshopAggregations";
import { workshops } from "../db/schema/workshops";

export const getWorkshopAggregations = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ workshopAggregation: workshopAggregations, workshop: workshops })
    .from(workshopAggregations)
    .leftJoin(workshops, eq(workshopAggregations.workshopId, workshops.id))
    .where(eq(workshopAggregations.userId, session?.user.id!));
  const w = rows.map((r) => ({
    ...r.workshopAggregation,
    workshop: r.workshop,
  }));
  return { workshopAggregations: w };
};

export const getWorkshopAggregationById = async (id: WorkshopAggregationId) => {
  const { session } = await getUserAuth();
  const { id: workshopAggregationId } = workshopAggregationIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({ workshopAggregation: workshopAggregations, workshop: workshops })
    .from(workshopAggregations)
    .where(
      and(
        eq(workshopAggregations.id, workshopAggregationId),
        eq(workshopAggregations.userId, session?.user.id!),
      ),
    )
    .leftJoin(workshops, eq(workshopAggregations.workshopId, workshops.id));
  if (row === undefined) return {};
  const w = { ...row.workshopAggregation, workshop: row.workshop };
  return { workshopAggregation: w };
};
