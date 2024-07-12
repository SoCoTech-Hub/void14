import type { UniversityId } from "@soco/universities-db/schema/universities";
import { eq } from "@soco/universities-db";
import { db } from "@soco/universities-db/client";
import {
  universities,
  universityIdSchema,
} from "@soco/universities-db/schema/universities";

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
