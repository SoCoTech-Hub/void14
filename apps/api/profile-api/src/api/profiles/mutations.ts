import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/profile-db";
import { db } from "@soco/profile-db/client";
import {
  insertProfileSchema,
  NewProfileParams,
  ProfileId,
  profileIdSchema,
  profiles,
  UpdateProfileParams,
  updateProfileSchema,
} from "@soco/profile-db/schema/profiles";

export const createProfile = async (profile: NewProfileParams) => {
  const { session } = await getUserAuth();
  const newProfile = insertProfileSchema.parse({
    ...profile,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db.insert(profiles).values(newProfile).returning();
    return { profile: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateProfile = async (
  id: ProfileId,
  profile: UpdateProfileParams,
) => {
  const { session } = await getUserAuth();
  const { id: profileId } = profileIdSchema.parse({ id });
  const newProfile = updateProfileSchema.parse({
    ...profile,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db
      .update(profiles)
      .set({ ...newProfile, updatedAt: new Date() })
      .where(
        and(
          eq(profiles.id, profileId!),
          eq(profiles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { profile: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteProfile = async (id: ProfileId) => {
  const { session } = await getUserAuth();
  const { id: profileId } = profileIdSchema.parse({ id });
  try {
    const [p] = await db
      .delete(profiles)
      .where(
        and(
          eq(profiles.id, profileId!),
          eq(profiles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { profile: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
