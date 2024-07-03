import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SchoolId, schoolIdSchema, schools } from "@/lib/db/schema/schools";
import { grades } from "@/lib/db/schema/grades";

export const getSchools = async () => {
  const rows = await db.select({ school: schools, grade: grades }).from(schools).leftJoin(grades, eq(schools.gradeId, grades.id));
  const s = rows .map((r) => ({ ...r.school, grade: r.grade})); 
  return { schools: s };
};

export const getSchoolById = async (id: SchoolId) => {
  const { id: schoolId } = schoolIdSchema.parse({ id });
  const [row] = await db.select({ school: schools, grade: grades }).from(schools).where(eq(schools.id, schoolId)).leftJoin(grades, eq(schools.gradeId, grades.id));
  if (row === undefined) return {};
  const s =  { ...row.school, grade: row.grade } ;
  return { school: s };
};


