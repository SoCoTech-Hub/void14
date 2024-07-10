import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { type QtypeDdmarkerId, qtypeDdmarkerIdSchema, qtypeDdmarkers } from "@soco/qtype-db/schema/qtypeDdmarkers";

export const getQtypeDdmarkers = async () => {
  const rows = await db.select().from(qtypeDdmarkers);
  const q = rows
  return { qtypeDdmarkers: q };
};

export const getQtypeDdmarkerById = async (id: QtypeDdmarkerId) => {
  const { id: qtypeDdmarkerId } = qtypeDdmarkerIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeDdmarkers).where(eq(qtypeDdmarkers.id, qtypeDdmarkerId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdmarker: q };
};


