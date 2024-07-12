import type { QtypeDdimageortextDropId } from "@soco/qtype-db/schema/qtypeDdimageortextDrops";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  qtypeDdimageortextDropIdSchema,
  qtypeDdimageortextDrops,
} from "@soco/qtype-db/schema/qtypeDdimageortextDrops";

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
