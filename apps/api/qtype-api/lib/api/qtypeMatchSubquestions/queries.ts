import { eq } from "drizzle-orm";

import type { QtypeMatchSubquestionId } from "../../db/schema/qtypeMatchSubquestions";
import { db } from "../../db/index";
import {
  qtypeMatchSubquestionIdSchema,
  qtypeMatchSubquestions,
} from "../../db/schema/qtypeMatchSubquestions";

export const getQtypeMatchSubquestions = async () => {
  const rows = await db.select().from(qtypeMatchSubquestions);
  const q = rows;
  return { qtypeMatchSubquestions: q };
};

export const getQtypeMatchSubquestionById = async (
  id: QtypeMatchSubquestionId,
) => {
  const { id: qtypeMatchSubquestionId } = qtypeMatchSubquestionIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(qtypeMatchSubquestions)
    .where(eq(qtypeMatchSubquestions.id, qtypeMatchSubquestionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeMatchSubquestion: q };
};
