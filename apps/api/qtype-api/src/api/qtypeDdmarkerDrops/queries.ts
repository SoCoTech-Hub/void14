import type { QtypeDdmarkerDropId } from "@soco/qtype-db/schema/qtypeDdmarkerDrops";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  qtypeDdmarkerDropIdSchema,
  qtypeDdmarkerDrops,
} from "@soco/qtype-db/schema/qtypeDdmarkerDrops";

export const getQtypeDdmarkerDrops = async () => {
  const rows = await db.select().from(qtypeDdmarkerDrops);
  const q = rows;
  return { qtypeDdmarkerDrops: q };
};

export const getQtypeDdmarkerDropById = async (id: QtypeDdmarkerDropId) => {
  const { id: qtypeDdmarkerDropId } = qtypeDdmarkerDropIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(qtypeDdmarkerDrops)
    .where(eq(qtypeDdmarkerDrops.id, qtypeDdmarkerDropId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdmarkerDrop: q };
};
