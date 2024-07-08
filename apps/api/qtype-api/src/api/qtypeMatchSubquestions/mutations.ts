import { db } from "@soco/qtype-db/index";
import { eq } from "drizzle-orm";
import { 
  QtypeMatchSubquestionId, 
  NewQtypeMatchSubquestionParams,
  UpdateQtypeMatchSubquestionParams, 
  updateQtypeMatchSubquestionSchema,
  insertQtypeMatchSubquestionSchema, 
  qtypeMatchSubquestions,
  qtypeMatchSubquestionIdSchema 
} from "@soco/qtype-db/schema/qtypeMatchSubquestions";

export const createQtypeMatchSubquestion = async (qtypeMatchSubquestion: NewQtypeMatchSubquestionParams) => {
  const newQtypeMatchSubquestion = insertQtypeMatchSubquestionSchema.parse(qtypeMatchSubquestion);
  try {
    const [q] =  await db.insert(qtypeMatchSubquestions).values(newQtypeMatchSubquestion).returning();
    return { qtypeMatchSubquestion: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeMatchSubquestion = async (id: QtypeMatchSubquestionId, qtypeMatchSubquestion: UpdateQtypeMatchSubquestionParams) => {
  const { id: qtypeMatchSubquestionId } = qtypeMatchSubquestionIdSchema.parse({ id });
  const newQtypeMatchSubquestion = updateQtypeMatchSubquestionSchema.parse(qtypeMatchSubquestion);
  try {
    const [q] =  await db
     .update(qtypeMatchSubquestions)
     .set(newQtypeMatchSubquestion)
     .where(eq(qtypeMatchSubquestions.id, qtypeMatchSubquestionId!))
     .returning();
    return { qtypeMatchSubquestion: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeMatchSubquestion = async (id: QtypeMatchSubquestionId) => {
  const { id: qtypeMatchSubquestionId } = qtypeMatchSubquestionIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(qtypeMatchSubquestions).where(eq(qtypeMatchSubquestions.id, qtypeMatchSubquestionId!))
    .returning();
    return { qtypeMatchSubquestion: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

