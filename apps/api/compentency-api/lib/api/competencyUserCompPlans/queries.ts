import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CompetencyUserCompPlanId } from "../db/schema/competencyUserCompPlans";
import { db } from "../db/index";
import { competencies } from "../db/schema/competencies";
import { competencyPlans } from "../db/schema/competencyPlans";
import {
  competencyUserCompPlanIdSchema,
  competencyUserCompPlans,
} from "../db/schema/competencyUserCompPlans";

export const getCompetencyUserCompPlans = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyUserCompPlan: competencyUserCompPlans,
      competency: competencies,
      competencyPlan: competencyPlans,
    })
    .from(competencyUserCompPlans)
    .leftJoin(
      competencies,
      eq(competencyUserCompPlans.competencyId, competencies.id),
    )
    .leftJoin(
      competencyPlans,
      eq(competencyUserCompPlans.competencyPlanId, competencyPlans.id),
    )
    .where(eq(competencyUserCompPlans.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyUserCompPlan,
    competency: r.competency,
    competencyPlan: r.competencyPlan,
  }));
  return { competencyUserCompPlans: c };
};

export const getCompetencyUserCompPlanById = async (
  id: CompetencyUserCompPlanId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompPlanId } = competencyUserCompPlanIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select({
      competencyUserCompPlan: competencyUserCompPlans,
      competency: competencies,
      competencyPlan: competencyPlans,
    })
    .from(competencyUserCompPlans)
    .where(
      and(
        eq(competencyUserCompPlans.id, competencyUserCompPlanId),
        eq(competencyUserCompPlans.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyUserCompPlans.competencyId, competencies.id),
    )
    .leftJoin(
      competencyPlans,
      eq(competencyUserCompPlans.competencyPlanId, competencyPlans.id),
    );
  if (row === undefined) return {};
  const c = {
    ...row.competencyUserCompPlan,
    competency: row.competency,
    competencyPlan: row.competencyPlan,
  };
  return { competencyUserCompPlan: c };
};
