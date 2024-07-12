import type { ScormSeqMapinfoId } from "@soco/scorm-db/schema/scormSeqMapinfos";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import { scormScoes } from "@soco/scorm-db/schema/scormScoes";
import {
  scormSeqMapinfoIdSchema,
  scormSeqMapinfos,
} from "@soco/scorm-db/schema/scormSeqMapinfos";
import { scormSeqObjectives } from "@soco/scorm-db/schema/scormSeqObjectives";

export const getScormSeqMapinfos = async () => {
  const rows = await db
    .select({
      scormSeqMapinfo: scormSeqMapinfos,
      scormSeqObjective: scormSeqObjectives,
      scormScoe: scormScoes,
    })
    .from(scormSeqMapinfos)
    .leftJoin(
      scormSeqObjectives,
      eq(scormSeqMapinfos.scormSeqObjectiveId, scormSeqObjectives.id),
    )
    .leftJoin(scormScoes, eq(scormSeqMapinfos.scormScoeId, scormScoes.id))
    .leftJoin(
      scormSeqObjectives,
      eq(scormSeqMapinfos.scormSeqObjectiveId, scormSeqObjectives.id),
    );
  const s = rows.map((r) => ({
    ...r.scormSeqMapinfo,
    scormSeqObjective: r.scormSeqObjective,
    scormScoe: r.scormScoe,
  }));
  return { scormSeqMapinfos: s };
};

export const getScormSeqMapinfoById = async (id: ScormSeqMapinfoId) => {
  const { id: scormSeqMapinfoId } = scormSeqMapinfoIdSchema.parse({ id });
  const [row] = await db
    .select({
      scormSeqMapinfo: scormSeqMapinfos,
      scormSeqObjective: scormSeqObjectives,
      scormScoe: scormScoes,
    })
    .from(scormSeqMapinfos)
    .where(eq(scormSeqMapinfos.id, scormSeqMapinfoId))
    .leftJoin(
      scormSeqObjectives,
      eq(scormSeqMapinfos.scormSeqObjectiveId, scormSeqObjectives.id),
    )
    .leftJoin(scormScoes, eq(scormSeqMapinfos.scormScoeId, scormScoes.id))
    .leftJoin(
      scormSeqObjectives,
      eq(scormSeqMapinfos.scormSeqObjectiveId, scormSeqObjectives.id),
    );
  if (row === undefined) return {};
  const s = {
    ...row.scormSeqMapinfo,
    scormSeqObjective: row.scormSeqObjective,
    scormScoe: row.scormScoe,
  };
  return { scormSeqMapinfo: s };
};
