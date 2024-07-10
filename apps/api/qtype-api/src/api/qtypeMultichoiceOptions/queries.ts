import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { type QtypeMultichoiceOptionId, qtypeMultichoiceOptionIdSchema, qtypeMultichoiceOptions } from "@soco/qtype-db/schema/qtypeMultichoiceOptions";

export const getQtypeMultichoiceOptions = async () => {
  const rows = await db.select().from(qtypeMultichoiceOptions);
  const q = rows
  return { qtypeMultichoiceOptions: q };
};

export const getQtypeMultichoiceOptionById = async (id: QtypeMultichoiceOptionId) => {
  const { id: qtypeMultichoiceOptionId } = qtypeMultichoiceOptionIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeMultichoiceOptions).where(eq(qtypeMultichoiceOptions.id, qtypeMultichoiceOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeMultichoiceOption: q };
};


