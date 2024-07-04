import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type EnrolFlatfileId, enrolFlatfileIdSchema, enrolFlatfiles } from "@/lib/db/schema/enrolFlatfiles";

export const getEnrolFlatfiles = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(enrolFlatfiles).where(eq(enrolFlatfiles.userId, session?.user.id!));
  const e = rows
  return { enrolFlatfiles: e };
};

export const getEnrolFlatfileById = async (id: EnrolFlatfileId) => {
  const { session } = await getUserAuth();
  const { id: enrolFlatfileId } = enrolFlatfileIdSchema.parse({ id });
  const [row] = await db.select().from(enrolFlatfiles).where(and(eq(enrolFlatfiles.id, enrolFlatfileId), eq(enrolFlatfiles.userId, session?.user.id!)));
  if (row === undefined) return {};
  const e = row;
  return { enrolFlatfile: e };
};


