import { db } from "@soco/qtype-db/index";
import { eq } from "drizzle-orm";
import { type QtypeDdmarkerDropId, qtypeDdmarkerDropIdSchema, qtypeDdmarkerDrops } from "@soco/qtype-db/schema/qtypeDdmarkerDrops";

export const getQtypeDdmarkerDrops = async () => {
  const rows = await db.select().from(qtypeDdmarkerDrops);
  const q = rows
  return { qtypeDdmarkerDrops: q };
};

export const getQtypeDdmarkerDropById = async (id: QtypeDdmarkerDropId) => {
  const { id: qtypeDdmarkerDropId } = qtypeDdmarkerDropIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeDdmarkerDrops).where(eq(qtypeDdmarkerDrops.id, qtypeDdmarkerDropId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdmarkerDrop: q };
};


