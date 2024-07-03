import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QtypeShortanswerOptionId, qtypeShortanswerOptionIdSchema, qtypeShortanswerOptions } from "@/lib/db/schema/qtypeShortanswerOptions";

export const getQtypeShortanswerOptions = async () => {
  const rows = await db.select().from(qtypeShortanswerOptions);
  const q = rows
  return { qtypeShortanswerOptions: q };
};

export const getQtypeShortanswerOptionById = async (id: QtypeShortanswerOptionId) => {
  const { id: qtypeShortanswerOptionId } = qtypeShortanswerOptionIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeShortanswerOptions).where(eq(qtypeShortanswerOptions.id, qtypeShortanswerOptionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeShortanswerOption: q };
};


