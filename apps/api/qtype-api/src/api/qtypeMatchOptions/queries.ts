import type { QtypeMatchOptionId } from "@soco/qtype-db/schema/qtypeMatchOptions";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  qtypeMatchOptionIdSchema,
  qtypeMatchOptions,
} from "@soco/qtype-db/schema/qtypeMatchOptions";

export const getQtypeMatchOptions = async () => {
  const rows = await db.select().from(qtypeMatchOptions);
  const q = rows;
  return { qtypeMatchOptions: q };
};

export const getQtypeMatchOptionById = async (id: QtypeMatchOptionId) => {
  const { id: qtypeMatchOptionId } = qtypeMatchOptionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(qtypeMatchOptions)
    .where(eq(qtypeMatchOptions.id, qtypeMatchOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeMatchOption: q };
};
