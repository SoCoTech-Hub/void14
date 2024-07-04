import { eq } from "drizzle-orm";

import type { QtypeDdimageortextDropId } from "../db/schema/qtypeDdimageortextDrops";
import { db } from "../db/index";
import {
  qtypeDdimageortextDropIdSchema,
  qtypeDdimageortextDrops,
} from "../db/schema/qtypeDdimageortextDrops";

export const getQtypeDdimageortextDrops = async () => {
  const rows = await db.select().from(qtypeDdimageortextDrops);
  const q = rows;
  return { qtypeDdimageortextDrops: q };
};

export const getQtypeDdimageortextDropById = async (
  id: QtypeDdimageortextDropId,
) => {
  const { id: qtypeDdimageortextDropId } = qtypeDdimageortextDropIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(qtypeDdimageortextDrops)
    .where(eq(qtypeDdimageortextDrops.id, qtypeDdimageortextDropId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdimageortextDrop: q };
};