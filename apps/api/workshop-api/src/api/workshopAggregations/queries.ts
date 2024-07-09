import { and, eq } from "drizzle-orm";

import type { WorkshopAggregationId } from "@soco/workshop-db/schema/workshopAggregations";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/workshop-db/index";
import {
  workshopAggregationIdSchema,
  workshopAggregations,
} from "@soco/workshop-db/schema/workshopAggregations";
import { workshops } from "@soco/workshop-db/schema/workshops";

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
