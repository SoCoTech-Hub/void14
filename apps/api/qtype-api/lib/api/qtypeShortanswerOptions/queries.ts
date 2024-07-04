import { eq } from "drizzle-orm";

import type { QtypeShortanswerOptionId } from "../db/schema/qtypeShortanswerOptions";
import { db } from "../db/index";
import {
  qtypeShortanswerOptionIdSchema,
  qtypeShortanswerOptions,
} from "../db/schema/qtypeShortanswerOptions";

export const getQtypeShortanswerOptions = async () => {
  const rows = await db.select().from(qtypeShortanswerOptions);
  const q = rows;
  return { qtypeShortanswerOptions: q };
};

export const getQtypeShortanswerOptionById = async (
  id: QtypeShortanswerOptionId,
) => {
  const { id: qtypeShortanswerOptionId } = qtypeShortanswerOptionIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(qtypeShortanswerOptions)
    .where(eq(qtypeShortanswerOptions.id, qtypeShortanswerOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeShortanswerOption: q };
};
