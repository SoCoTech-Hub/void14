import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type CompetencyEvidenceId, competencyEvidenceIdSchema, competencyEvidences } from "@/lib/db/schema/competencyEvidences";

export const getCompetencyEvidences = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(competencyEvidences).where(eq(competencyEvidences.userId, session?.user.id!));
  const c = rows
  return { competencyEvidences: c };
};

export const getCompetencyEvidenceById = async (id: CompetencyEvidenceId) => {
  const { session } = await getUserAuth();
  const { id: competencyEvidenceId } = competencyEvidenceIdSchema.parse({ id });
  const [row] = await db.select().from(competencyEvidences).where(and(eq(competencyEvidences.id, competencyEvidenceId), eq(competencyEvidences.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { competencyEvidence: c };
};


