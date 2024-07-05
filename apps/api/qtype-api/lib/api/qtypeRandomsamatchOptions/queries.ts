import { eq } from "drizzle-orm";

import type { QtypeRandomsamatchOptionId } from "../../db/schema/qtypeRandomsamatchOptions";
import { db } from "../../db/index";
import {
  qtypeRandomsamatchOptionIdSchema,
  qtypeRandomsamatchOptions,
} from "../../db/schema/qtypeRandomsamatchOptions";

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
