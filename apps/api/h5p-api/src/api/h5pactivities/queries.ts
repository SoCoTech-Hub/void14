import type { H5pactivityId } from "@soco/h5p-db/schema/h5pactivities";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import {
  h5pactivities,
  h5pactivityIdSchema,
} from "@soco/h5p-db/schema/h5pactivities";

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
