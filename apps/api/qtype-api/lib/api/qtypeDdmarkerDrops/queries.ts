import { eq } from "drizzle-orm";

import type { QtypeDdmarkerDropId } from "../../db/schema/qtypeDdmarkerDrops";
import { db } from "../../db/index";
import {
  qtypeDdmarkerDropIdSchema,
  qtypeDdmarkerDrops,
} from "../../db/schema/qtypeDdmarkerDrops";

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
