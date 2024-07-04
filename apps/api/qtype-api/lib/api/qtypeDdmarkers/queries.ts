import { eq } from "drizzle-orm";

import type { QtypeDdmarkerId } from "../db/schema/qtypeDdmarkers";
import { db } from "../db/index";
import {
  qtypeDdmarkerIdSchema,
  qtypeDdmarkers,
} from "../db/schema/qtypeDdmarkers";

export const getQtypeDdmarkers = async () => {
  const rows = await db.select().from(qtypeDdmarkers);
  const q = rows;
  return { qtypeDdmarkers: q };
};

export const getQtypeDdmarkerById = async (id: QtypeDdmarkerId) => {
  const { id: qtypeDdmarkerId } = qtypeDdmarkerIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(qtypeDdmarkers)
    .where(eq(qtypeDdmarkers.id, qtypeDdmarkerId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdmarker: q };
};
