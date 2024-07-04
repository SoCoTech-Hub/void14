import { eq } from "drizzle-orm";

import type { QtypeEssayOptionId } from "../db/schema/qtypeEssayOptions";
import { db } from "../db/index";
import {
  qtypeEssayOptionIdSchema,
  qtypeEssayOptions,
} from "../db/schema/qtypeEssayOptions";

export const getQtypeEssayOptions = async () => {
  const rows = await db.select().from(qtypeEssayOptions);
  const q = rows;
  return { qtypeEssayOptions: q };
};

export const getQtypeEssayOptionById = async (id: QtypeEssayOptionId) => {
  const { id: qtypeEssayOptionId } = qtypeEssayOptionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(qtypeEssayOptions)
    .where(eq(qtypeEssayOptions.id, qtypeEssayOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeEssayOption: q };
};
