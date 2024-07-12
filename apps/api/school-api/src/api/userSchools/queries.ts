import type { UserSchoolId } from "@soco/school-db/schema/userSchools";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/school-db";
import { db } from "@soco/school-db/client";
import { schools } from "@soco/school-db/schema/schools";
import {
  userSchoolIdSchema,
  userSchools,
} from "@soco/school-db/schema/userSchools";

export const getUserSchools = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ userSchool: userSchools, school: schools })
    .from(userSchools)
    .leftJoin(schools, eq(userSchools.schoolId, schools.id))
    .where(eq(userSchools.userId, session?.user.id!));
  const u = rows.map((r) => ({ ...r.userSchool, school: r.school }));
  return { userSchools: u };
};

export const getUserSchoolById = async (id: UserSchoolId) => {
  const { session } = await getUserAuth();
  const { id: userSchoolId } = userSchoolIdSchema.parse({ id });
  const [row] = await db
    .select({ userSchool: userSchools, school: schools })
    .from(userSchools)
    .where(
      and(
        eq(userSchools.id, userSchoolId),
        eq(userSchools.userId, session?.user.id!),
      ),
    )
    .leftJoin(schools, eq(userSchools.schoolId, schools.id));
  if (row === undefined) return {};
  const u = { ...row.userSchool, school: row.school };
  return { userSchool: u };
};
