import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type UserSchoolId, userSchoolIdSchema, userSchools } from "@/lib/db/schema/userSchools";
import { schools } from "@/lib/db/schema/schools";

export const getUserSchools = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ userSchool: userSchools, school: schools }).from(userSchools).leftJoin(schools, eq(userSchools.schoolId, schools.id)).where(eq(userSchools.userId, session?.user.id!));
  const u = rows .map((r) => ({ ...r.userSchool, school: r.school})); 
  return { userSchools: u };
};

export const getUserSchoolById = async (id: UserSchoolId) => {
  const { session } = await getUserAuth();
  const { id: userSchoolId } = userSchoolIdSchema.parse({ id });
  const [row] = await db.select({ userSchool: userSchools, school: schools }).from(userSchools).where(and(eq(userSchools.id, userSchoolId), eq(userSchools.userId, session?.user.id!))).leftJoin(schools, eq(userSchools.schoolId, schools.id));
  if (row === undefined) return {};
  const u =  { ...row.userSchool, school: row.school } ;
  return { userSchool: u };
};


