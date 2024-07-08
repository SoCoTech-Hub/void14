import { db } from "@soco/qtype-db/index";
import { eq } from "drizzle-orm";
import { type QtypeEssayOptionId, qtypeEssayOptionIdSchema, qtypeEssayOptions } from "@soco/qtype-db/schema/qtypeEssayOptions";

export const getQtypeEssayOptions = async () => {
  const rows = await db.select().from(qtypeEssayOptions);
  const q = rows
  return { qtypeEssayOptions: q };
};

export const getQtypeEssayOptionById = async (id: QtypeEssayOptionId) => {
  const { id: qtypeEssayOptionId } = qtypeEssayOptionIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeEssayOptions).where(eq(qtypeEssayOptions.id, qtypeEssayOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeEssayOption: q };
};


