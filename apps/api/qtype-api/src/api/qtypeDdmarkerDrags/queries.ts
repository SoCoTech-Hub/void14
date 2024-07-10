import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { type QtypeDdmarkerDragId, qtypeDdmarkerDragIdSchema, qtypeDdmarkerDrags } from "@soco/qtype-db/schema/qtypeDdmarkerDrags";

export const getQtypeDdmarkerDrags = async () => {
  const rows = await db.select().from(qtypeDdmarkerDrags);
  const q = rows
  return { qtypeDdmarkerDrags: q };
};

export const getQtypeDdmarkerDragById = async (id: QtypeDdmarkerDragId) => {
  const { id: qtypeDdmarkerDragId } = qtypeDdmarkerDragIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeDdmarkerDrags).where(eq(qtypeDdmarkerDrags.id, qtypeDdmarkerDragId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdmarkerDrag: q };
};


