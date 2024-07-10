import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { type QtypeDdimageortextId, qtypeDdimageortextIdSchema, qtypeDdimageortexts } from "@soco/qtype-db/schema/qtypeDdimageortexts";

export const getQtypeDdimageortexts = async () => {
  const rows = await db.select().from(qtypeDdimageortexts);
  const q = rows
  return { qtypeDdimageortexts: q };
};

export const getQtypeDdimageortextById = async (id: QtypeDdimageortextId) => {
  const { id: qtypeDdimageortextId } = qtypeDdimageortextIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeDdimageortexts).where(eq(qtypeDdimageortexts.id, qtypeDdimageortextId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeDdimageortext: q };
};


