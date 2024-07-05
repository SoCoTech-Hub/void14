import { eq } from "drizzle-orm";

import type { UniversityId } from "../../db/schema/universities";
import { db } from "../../db/index";
import { universities, universityIdSchema } from "../../db/schema/universities";

export const getUniversities = async () => {
  const rows = await db.select().from(universities);
  const u = rows;
  return { universities: u };
};

export const getUniversityById = async (id: UniversityId) => {
  const { id: universityId } = universityIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(universities)
    .where(eq(universities.id, universityId));
  if (row === undefined) return {};
  const u = row;
  return { university: u };
};
