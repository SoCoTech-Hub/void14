import { eq } from "drizzle-orm";

import type { ScormSeqObjectiveId } from "../db/schema/scormSeqObjectives";
import { db } from "../db/index";
import { scormScoes } from "../db/schema/scormScoes";
import {
  scormSeqObjectiveIdSchema,
  scormSeqObjectives,
} from "../db/schema/scormSeqObjectives";

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
