import { eq } from "drizzle-orm";

import type { H5pactivityId } from "../db/schema/h5pactivities";
import { db } from "../db/index";
import { h5pactivities, h5pactivityIdSchema } from "../db/schema/h5pactivities";

export const getH5pactivities = async () => {
  const rows = await db.select().from(h5pactivities);
  const h = rows;
  return { h5pactivities: h };
};

export const getH5pactivityById = async (id: H5pactivityId) => {
  const { id: h5pactivityId } = h5pactivityIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(h5pactivities)
    .where(eq(h5pactivities.id, h5pactivityId));
  if (row === undefined) return {};
  const h = row;
  return { h5pactivity: h };
};
