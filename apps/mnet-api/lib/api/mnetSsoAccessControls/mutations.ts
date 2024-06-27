import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  MnetSsoAccessControlId, 
  NewMnetSsoAccessControlParams,
  UpdateMnetSsoAccessControlParams, 
  updateMnetSsoAccessControlSchema,
  insertMnetSsoAccessControlSchema, 
  mnetSsoAccessControls,
  mnetSsoAccessControlIdSchema 
} from "@/lib/db/schema/mnetSsoAccessControls";

export const createMnetSsoAccessControl = async (mnetSsoAccessControl: NewMnetSsoAccessControlParams) => {
  const newMnetSsoAccessControl = insertMnetSsoAccessControlSchema.parse(mnetSsoAccessControl);
  try {
    const [m] =  await db.insert(mnetSsoAccessControls).values(newMnetSsoAccessControl).returning();
    return { mnetSsoAccessControl: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetSsoAccessControl = async (id: MnetSsoAccessControlId, mnetSsoAccessControl: UpdateMnetSsoAccessControlParams) => {
  const { id: mnetSsoAccessControlId } = mnetSsoAccessControlIdSchema.parse({ id });
  const newMnetSsoAccessControl = updateMnetSsoAccessControlSchema.parse(mnetSsoAccessControl);
  try {
    const [m] =  await db
     .update(mnetSsoAccessControls)
     .set(newMnetSsoAccessControl)
     .where(eq(mnetSsoAccessControls.id, mnetSsoAccessControlId!))
     .returning();
    return { mnetSsoAccessControl: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetSsoAccessControl = async (id: MnetSsoAccessControlId) => {
  const { id: mnetSsoAccessControlId } = mnetSsoAccessControlIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetSsoAccessControls).where(eq(mnetSsoAccessControls.id, mnetSsoAccessControlId!))
    .returning();
    return { mnetSsoAccessControl: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

