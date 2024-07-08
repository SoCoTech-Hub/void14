import { db } from "@soco/qtype-db/index";
import { eq } from "drizzle-orm";
import { type QtypeMatchSubquestionId, qtypeMatchSubquestionIdSchema, qtypeMatchSubquestions } from "@soco/qtype-db/schema/qtypeMatchSubquestions";

export const getQtypeMatchSubquestions = async () => {
  const rows = await db.select().from(qtypeMatchSubquestions);
  const q = rows
  return { qtypeMatchSubquestions: q };
};

export const getQtypeMatchSubquestionById = async (id: QtypeMatchSubquestionId) => {
  const { id: qtypeMatchSubquestionId } = qtypeMatchSubquestionIdSchema.parse({ id });
  const [row] = await db.select().from(qtypeMatchSubquestions).where(eq(qtypeMatchSubquestions.id, qtypeMatchSubquestionId));
  if (row === undefined) return {};
  const q = row;
  return { qtypeMatchSubquestion: q };
};


