import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  GradeImportNewitemId, 
  NewGradeImportNewitemParams,
  UpdateGradeImportNewitemParams, 
  updateGradeImportNewitemSchema,
  insertGradeImportNewitemSchema, 
  gradeImportNewitems,
  gradeImportNewitemIdSchema 
} from "@/lib/db/schema/gradeImportNewitems";

export const createGradeImportNewitem = async (gradeImportNewitem: NewGradeImportNewitemParams) => {
  const newGradeImportNewitem = insertGradeImportNewitemSchema.parse(gradeImportNewitem);
  try {
    const [g] =  await db.insert(gradeImportNewitems).values(newGradeImportNewitem).returning();
    return { gradeImportNewitem: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeImportNewitem = async (id: GradeImportNewitemId, gradeImportNewitem: UpdateGradeImportNewitemParams) => {
  const { id: gradeImportNewitemId } = gradeImportNewitemIdSchema.parse({ id });
  const newGradeImportNewitem = updateGradeImportNewitemSchema.parse(gradeImportNewitem);
  try {
    const [g] =  await db
     .update(gradeImportNewitems)
     .set(newGradeImportNewitem)
     .where(eq(gradeImportNewitems.id, gradeImportNewitemId!))
     .returning();
    return { gradeImportNewitem: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeImportNewitem = async (id: GradeImportNewitemId) => {
  const { id: gradeImportNewitemId } = gradeImportNewitemIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeImportNewitems).where(eq(gradeImportNewitems.id, gradeImportNewitemId!))
    .returning();
    return { gradeImportNewitem: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

