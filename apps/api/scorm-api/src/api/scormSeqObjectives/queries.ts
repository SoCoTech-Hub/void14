import type { ScormSeqObjectiveId } from "@soco/scorm-db/schema/scormSeqObjectives";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";
import {
  scormSeqObjectiveIdSchema,
  scormSeqObjectives,
} from "@soco/scorm-db/schema/scormSeqObjectives";

export const getScormSeqObjectives = async () => {
  const rows = await db
    .select({ scormSeqObjective: scormSeqObjectives, scormScoe: scormScoes })
    .from(scormSeqObjectives)
    .leftJoin(scormScoes, eq(scormSeqObjectives.scormScoeId, scormScoes.id));
  const s = rows.map((r) => ({
    ...r.scormSeqObjective,
    scormScoe: r.scormScoe,
  }));
  return { scormSeqObjectives: s };
};

export const getScormSeqObjectiveById = async (id: ScormSeqObjectiveId) => {
  const { id: scormSeqObjectiveId } = scormSeqObjectiveIdSchema.parse({ id });
  const [row] = await db
    .select({ scormSeqObjective: scormSeqObjectives, scormScoe: scormScoes })
    .from(scormSeqObjectives)
    .where(eq(scormSeqObjectives.id, scormSeqObjectiveId))
    .leftJoin(scormScoes, eq(scormSeqObjectives.scormScoeId, scormScoes.id));
  if (row === undefined) return {};
  const s = { ...row.scormSeqObjective, scormScoe: row.scormScoe };
  return { scormSeqObjective: s };
};
