import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GenderId, genderIdSchema, genders } from "@/lib/db/schema/genders";

export const getGenders = async () => {
  const rows = await db.select().from(genders);
  const g = rows
  return { genders: g };
};

export const getGenderById = async (id: GenderId) => {
  const { id: genderId } = genderIdSchema.parse({ id });
  const [row] = await db.select().from(genders).where(eq(genders.id, genderId));
  if (row === undefined) return {};
  const g = row;
  return { gender: g };
};


