import { db } from "@soco/profile-db/client";
import { eq } from "@soco/profile-db";
import { 
  GenderId, 
  NewGenderParams,
  UpdateGenderParams, 
  updateGenderSchema,
  insertGenderSchema, 
  genders,
  genderIdSchema 
} from "@soco/profile-db/schema/genders";

export const createGender = async (gender: NewGenderParams) => {
  const newGender = insertGenderSchema.parse(gender);
  try {
    const [g] =  await db.insert(genders).values(newGender).returning();
    return { gender: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGender = async (id: GenderId, gender: UpdateGenderParams) => {
  const { id: genderId } = genderIdSchema.parse({ id });
  const newGender = updateGenderSchema.parse(gender);
  try {
    const [g] =  await db
     .update(genders)
     .set(newGender)
     .where(eq(genders.id, genderId!))
     .returning();
    return { gender: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGender = async (id: GenderId) => {
  const { id: genderId } = genderIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(genders).where(eq(genders.id, genderId!))
    .returning();
    return { gender: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

