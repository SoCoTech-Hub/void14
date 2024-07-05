import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { EnrolPaypalId } from "../../db/schema/enrolPaypals";
import { db } from "../../db/index";
import {
  enrolPaypalIdSchema,
  enrolPaypals,
} from "../../db/schema/enrolPaypals";

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
