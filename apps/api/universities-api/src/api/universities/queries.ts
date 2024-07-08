import { db } from "@soco/universities-db/index";
import { eq } from "drizzle-orm";
import { type UniversityId, universityIdSchema, universities } from "@soco/universities-db/schema/universities";

export const getUniversities = async () => {
  const rows = await db.select().from(universities);
  const u = rows
  return { universities: u };
};

export const getUniversityById = async (id: UniversityId) => {
  const { id: universityId } = universityIdSchema.parse({ id });
  const [row] = await db.select().from(universities).where(eq(universities.id, universityId));
  if (row === undefined) return {};
  const u = row;
  return { university: u };
};


