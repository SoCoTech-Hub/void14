import { db } from "@soco/enrol-db/client";
import { eq, and } from "@soco/enrol-db";
import { getUserAuth } from "@soco/auth-service";
import { type EnrolFlatfileId, enrolFlatfileIdSchema, enrolFlatfiles } from "@soco/enrol-db/schema/enrolFlatfiles";

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


