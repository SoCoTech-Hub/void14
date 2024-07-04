import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CompetencyCourseCompId } from "../db/schema/competencyCourseComps";
import { db } from "../db/index";
import { competencies } from "../db/schema/competencies";
import {
  competencyCourseCompIdSchema,
  competencyCourseComps,
} from "../db/schema/competencyCourseComps";

export const getCompetencyCourseComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      competencyCourseComp: competencyCourseComps,
      competency: competencies,
    })
    .from(competencyCourseComps)
    .leftJoin(
      competencies,
      eq(competencyCourseComps.competencyId, competencies.id),
    )
    .where(eq(competencyCourseComps.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.competencyCourseComp,
    competency: r.competency,
  }));
  return { competencyCourseComps: c };
};

export const getCompetencyCourseCompById = async (
  id: CompetencyCourseCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyCourseCompId } = competencyCourseCompIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      competencyCourseComp: competencyCourseComps,
      competency: competencies,
    })
    .from(competencyCourseComps)
    .where(
      and(
        eq(competencyCourseComps.id, competencyCourseCompId),
        eq(competencyCourseComps.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      competencies,
      eq(competencyCourseComps.competencyId, competencies.id),
    );
  if (row === undefined) return {};
  const c = { ...row.competencyCourseComp, competency: row.competency };
  return { competencyCourseComp: c };
};
