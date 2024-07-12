import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ScormSeqMapinfoId, 
  type NewScormSeqMapinfoParams,
  type UpdateScormSeqMapinfoParams, 
  updateScormSeqMapinfoSchema,
  insertScormSeqMapinfoSchema, 
  scormSeqMapinfos,
  scormSeqMapinfoIdSchema 
} from "@/lib/db/schema/scormSeqMapinfos";

export const createScormSeqMapinfo = async (scormSeqMapinfo: NewScormSeqMapinfoParams) => {
  const newScormSeqMapinfo = insertScormSeqMapinfoSchema.parse(scormSeqMapinfo);
  try {
    const [s] =  await db.insert(scormSeqMapinfos).values(newScormSeqMapinfo).returning();
    return { scormSeqMapinfo: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormSeqMapinfo = async (id: ScormSeqMapinfoId, scormSeqMapinfo: UpdateScormSeqMapinfoParams) => {
  const { id: scormSeqMapinfoId } = scormSeqMapinfoIdSchema.parse({ id });
  const newScormSeqMapinfo = updateScormSeqMapinfoSchema.parse(scormSeqMapinfo);
  try {
    const [s] =  await db
     .update(scormSeqMapinfos)
     .set(newScormSeqMapinfo)
     .where(eq(scormSeqMapinfos.id, scormSeqMapinfoId!))
     .returning();
    return { scormSeqMapinfo: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormSeqMapinfo = async (id: ScormSeqMapinfoId) => {
  const { id: scormSeqMapinfoId } = scormSeqMapinfoIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scormSeqMapinfos).where(eq(scormSeqMapinfos.id, scormSeqMapinfoId!))
    .returning();
    return { scormSeqMapinfo: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

