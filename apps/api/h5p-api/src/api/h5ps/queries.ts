import type { H5pId } from "@soco/h5p-db/schema/h5ps";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import { h5pIdSchema, h5ps } from "@soco/h5p-db/schema/h5ps";

export const getH5ps = async () => {
  const rows = await db.select().from(h5ps);
  const h = rows;
  return { h5ps: h };
};

export const getH5pById = async (id: H5pId) => {
  const { id: h5pId } = h5pIdSchema.parse({ id });
  const [row] = await db.select().from(h5ps).where(eq(h5ps.id, h5pId));
  if (row === undefined) return {};
  const h = row;
  return { h5p: h };
};
