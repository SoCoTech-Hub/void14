import { eq } from "drizzle-orm";

import type { SchoolId } from "../../db/schema/schools";
import { db } from "../../db/index";
import { grades } from "../../db/schema/grades";
import { schoolIdSchema, schools } from "../../db/schema/schools";

export const getSchools = async () => {
  const rows = await db
    .select({ school: schools, grade: grades })
    .from(schools)
    .leftJoin(grades, eq(schools.gradeId, grades.id));
  const s = rows.map((r) => ({ ...r.school, grade: r.grade }));
  return { schools: s };
};

export const getSchoolById = async (id: SchoolId) => {
  const { id: schoolId } = schoolIdSchema.parse({ id });
  const [row] = await db
    .select({ school: schools, grade: grades })
    .from(schools)
    .where(eq(schools.id, schoolId))
    .leftJoin(grades, eq(schools.gradeId, grades.id));
  if (row === undefined) return {};
  const s = { ...row.school, grade: row.grade };
  return { school: s };
};
