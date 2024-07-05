import { eq } from "drizzle-orm";

import type { MnetApplicationId } from "../../db/schema/mnetApplications";
import { db } from "../../db/index";
import {
  mnetApplicationIdSchema,
  mnetApplications,
} from "../../db/schema/mnetApplications";

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
