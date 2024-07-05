import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ScormScoesTrackId } from "../../db/schema/scormScoesTracks";
import { db } from "../../db/index";
import { scorms } from "../../db/schema/scorms";
import { scormScoes } from "../../db/schema/scormScoes";
import {
  scormScoesTrackIdSchema,
  scormScoesTracks,
} from "../../db/schema/scormScoesTracks";

export const getScormScoesTracks = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      scormScoesTrack: scormScoesTracks,
      scormScoe: scormScoes,
      scorm: scorms,
    })
    .from(scormScoesTracks)
    .leftJoin(scormScoes, eq(scormScoesTracks.scormScoeId, scormScoes.id))
    .leftJoin(scorms, eq(scormScoesTracks.scormId, scorms.id))
    .where(eq(scormScoesTracks.userId, session?.user.id!));
  const s = rows.map((r) => ({
    ...r.scormScoesTrack,
    scormScoe: r.scormScoe,
    scorm: r.scorm,
  }));
  return { scormScoesTracks: s };
};

export const getScormScoesTrackById = async (id: ScormScoesTrackId) => {
  const { session } = await getUserAuth();
  const { id: scormScoesTrackId } = scormScoesTrackIdSchema.parse({ id });
  const [row] = await db
    .select({
      scormScoesTrack: scormScoesTracks,
      scormScoe: scormScoes,
      scorm: scorms,
    })
    .from(scormScoesTracks)
    .where(
      and(
        eq(scormScoesTracks.id, scormScoesTrackId),
        eq(scormScoesTracks.userId, session?.user.id!),
      ),
    )
    .leftJoin(scormScoes, eq(scormScoesTracks.scormScoeId, scormScoes.id))
    .leftJoin(scorms, eq(scormScoesTracks.scormId, scorms.id));
  if (row === undefined) return {};
  const s = {
    ...row.scormScoesTrack,
    scormScoe: row.scormScoe,
    scorm: row.scorm,
  };
  return { scormScoesTrack: s };
};
