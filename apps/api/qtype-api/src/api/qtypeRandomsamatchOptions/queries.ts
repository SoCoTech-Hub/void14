import type { QtypeRandomsamatchOptionId } from "@soco/qtype-db/schema/qtypeRandomsamatchOptions";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  qtypeRandomsamatchOptionIdSchema,
  qtypeRandomsamatchOptions,
} from "@soco/qtype-db/schema/qtypeRandomsamatchOptions";

export const getQtypeRandomsamatchOptions = async () => {
  const rows = await db.select().from(qtypeRandomsamatchOptions);
  const q = rows;
  return { qtypeRandomsamatchOptions: q };
};

export const getQtypeRandomsamatchOptionById = async (
  id: QtypeRandomsamatchOptionId,
) => {
  const { id: qtypeRandomsamatchOptionId } =
    qtypeRandomsamatchOptionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(qtypeRandomsamatchOptions)
    .where(eq(qtypeRandomsamatchOptions.id, qtypeRandomsamatchOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeRandomsamatchOption: q };
};
