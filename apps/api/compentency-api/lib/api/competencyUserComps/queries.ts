import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CompetencyUserCompId } from "../../db/schema/competencyUserComps";
import { db } from "../../db/index";
import { competencies } from "../../db/schema/competencies";
import {
  competencyUserCompIdSchema,
  competencyUserComps,
} from "../../db/schema/competencyUserComps";

export const getCompetencyUserComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyUserComp: competencyUserComps,
      competency: competencies,
    })
    .from(competencyUserComps)
    .leftJoin(
      competencies,
      eq(competencyUserComps.competencyId, competencies.id),
    )
    .where(eq(competencyUserComps.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyUserComp,
    competency: r.competency,
  }));
  return { competencyUserComps: c };
};

export const getCompetencyUserCompById = async (id: CompetencyUserCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompId } = competencyUserCompIdSchema.parse({ id });
  const [row] = await db
    .select({
      competencyUserComp: competencyUserComps,
      competency: competencies,
    })
    .from(competencyUserComps)
    .where(
      and(
        eq(competencyUserComps.id, competencyUserCompId),
        eq(competencyUserComps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyUserComps.competencyId, competencies.id),
    );
  if (row === undefined) return {};
  const c = { ...row.competencyUserComp, competency: row.competency };
  return { competencyUserComp: c };
};
