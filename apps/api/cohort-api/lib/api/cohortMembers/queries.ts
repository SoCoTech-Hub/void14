import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CohortMemberId } from "../db/schema/cohortMembers";
import { db } from "../db/index";
import {
  cohortMemberIdSchema,
  cohortMembers,
} from "../db/schema/cohortMembers";
import { cohorts } from "../db/schema/cohorts";

export const getCohortMembers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ cohortMember: cohortMembers, cohort: cohorts })
    .from(cohortMembers)
    .leftJoin(cohorts, eq(cohortMembers.cohortId, cohorts.id))
    .where(eq(cohortMembers.userId, session?.user.id!));
  const c = rows.map((r) => ({ ...r.cohortMember, cohort: r.cohort }));
  return { cohortMembers: c };
};

export const getCohortMemberById = async (id: CohortMemberId) => {
  const { session } = await getUserAuth();
  const { id: cohortMemberId } = cohortMemberIdSchema.parse({ id });
  const [row] = await db
    .select({ cohortMember: cohortMembers, cohort: cohorts })
    .from(cohortMembers)
    .where(
      and(
        eq(cohortMembers.id, cohortMemberId),
        eq(cohortMembers.userId, session?.user.id!),
      ),
    )
    .leftJoin(cohorts, eq(cohortMembers.cohortId, cohorts.id));
  if (row === undefined) return {};
  const c = { ...row.cohortMember, cohort: row.cohort };
  return { cohortMember: c };
};