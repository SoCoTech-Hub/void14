import type { MnetApplicationId } from "@soco/mnet-db/schema/mnetApplications";
import { eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import {
  mnetApplicationIdSchema,
  mnetApplications,
} from "@soco/mnet-db/schema/mnetApplications";

export const getMnetApplications = async () => {
  const rows = await db.select().from(mnetApplications);
  const m = rows;
  return { mnetApplications: m };
};

export const getMnetApplicationById = async (id: MnetApplicationId) => {
  const { id: mnetApplicationId } = mnetApplicationIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(mnetApplications)
    .where(eq(mnetApplications.id, mnetApplicationId));
  if (row === undefined) return {};
  const m = row;
  return { mnetApplication: m };
};
