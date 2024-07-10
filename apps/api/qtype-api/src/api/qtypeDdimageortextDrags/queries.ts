import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { type QtypeDdimageortextDragId, qtypeDdimageortextDragIdSchema, qtypeDdimageortextDrags } from "@soco/qtype-db/schema/qtypeDdimageortextDrags";

export const getQtypeDdimageortextDrags = async () => {
  const rows = await db.select().from(qtypeDdimageortextDrags);
  const q = rows
  return { qtypeDdimageortextDrags: q };
};

export const getQtypeDdimageortextDragById = async (id: QtypeDdimageortextDragId) => {
  const { id: qtypeDdimageortextDragId } = qtypeDdimageortextDragIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeDdimageortextDrags).where(eq(qtypeDdimageortextDrags.id, qtypeDdimageortextDragId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdimageortextDrag: q };
};


