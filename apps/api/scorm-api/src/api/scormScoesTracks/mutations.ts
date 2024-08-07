import type {
  NewScormScoesTrackParams,
  ScormScoesTrackId,
  UpdateScormScoesTrackParams,
} from "@soco/scorm-db/schema/scormScoesTracks";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import {
  insertScormScoesTrackSchema,
  scormScoesTrackIdSchema,
  scormScoesTracks,
  updateScormScoesTrackSchema,
} from "@soco/scorm-db/schema/scormScoesTracks";

export const createScormScoesTrack = async (
  scormScoesTrack: NewScormScoesTrackParams,
) => {
  const { session } = await getUserAuth();
  const newScormScoesTrack = insertScormScoesTrackSchema.parse({
    ...scormScoesTrack,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(scormScoesTracks)
      .values(newScormScoesTrack)
      .returning();
    return { scormScoesTrack: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormScoesTrack = async (
  id: ScormScoesTrackId,
  scormScoesTrack: UpdateScormScoesTrackParams,
) => {
  const { session } = await getUserAuth();
  const { id: scormScoesTrackId } = scormScoesTrackIdSchema.parse({ id });
  const newScormScoesTrack = updateScormScoesTrackSchema.parse({
    ...scormScoesTrack,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(scormScoesTracks)
      .set({ ...newScormScoesTrack, updatedAt: new Date() })
      .where(
        and(
          eq(scormScoesTracks.id, scormScoesTrackId!),
          eq(scormScoesTracks.userId, session?.user.id!),
        ),
      )
      .returning();
    return { scormScoesTrack: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormScoesTrack = async (id: ScormScoesTrackId) => {
  const { session } = await getUserAuth();
  const { id: scormScoesTrackId } = scormScoesTrackIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(scormScoesTracks)
      .where(
        and(
          eq(scormScoesTracks.id, scormScoesTrackId!),
          eq(scormScoesTracks.userId, session?.user.id!),
        ),
      )
      .returning();
    return { scormScoesTrack: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
