import type { EnrolPaypalId } from "@soco/enrol-db/schema/enrolPaypals";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolPaypalIdSchema,
  enrolPaypals,
} from "@soco/enrol-db/schema/enrolPaypals";

export const getEnrolPaypals = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(enrolPaypals)
    .where(eq(enrolPaypals.userId, session?.user.id!));
  const e = rows;
  return { enrolPaypals: e };
};

export const getEnrolPaypalById = async (id: EnrolPaypalId) => {
  const { session } = await getUserAuth();
  const { id: enrolPaypalId } = enrolPaypalIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(enrolPaypals)
    .where(
      and(
        eq(enrolPaypals.id, enrolPaypalId),
        eq(enrolPaypals.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const e = row;
  return { enrolPaypal: e };
};
