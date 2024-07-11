import type { CompetencyUserCompPlanId } from "@soco/competency-db/schema/competencyUserCompPlans";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import { competencies } from "@soco/competency-db/schema/competencies";
import { competencyPlans } from "@soco/competency-db/schema/competencyPlans";
import {
  competencyUserCompPlanIdSchema,
  competencyUserCompPlans,
} from "@soco/competency-db/schema/competencyUserCompPlans";

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
