import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ProfileId, profileIdSchema, profiles } from "@/lib/db/schema/profiles";
import { addresses } from "@/lib/db/schema/addresses";
import { genders } from "@/lib/db/schema/genders";
import { nextOfKins } from "@/lib/db/schema/nextOfKins";

export const getProfiles = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ profile: profiles, address: addresses, gender: genders, nextOfKin: nextOfKins }).from(profiles).leftJoin(addresses, eq(profiles.addressId, addresses.id)).leftJoin(genders, eq(profiles.genderId, genders.id)).leftJoin(nextOfKins, eq(profiles.nextOfKinId, nextOfKins.id)).where(eq(profiles.userId, session?.user.id!));
  const p = rows .map((r) => ({ ...r.profile, address: r.address, gender: r.gender, nextOfKin: r.nextOfKin})); 
  return { profiles: p };
};

export const getProfileById = async (id: ProfileId) => {
  const { session } = await getUserAuth();
  const { id: profileId } = profileIdSchema.parse({ id });
  const [row] = await db.select({ profile: profiles, address: addresses, gender: genders, nextOfKin: nextOfKins }).from(profiles).where(and(eq(profiles.id, profileId), eq(profiles.userId, session?.user.id!))).leftJoin(addresses, eq(profiles.addressId, addresses.id)).leftJoin(genders, eq(profiles.genderId, genders.id)).leftJoin(nextOfKins, eq(profiles.nextOfKinId, nextOfKins.id));
  if (row === undefined) return {};
  const p =  { ...row.profile, address: row.address, gender: row.gender, nextOfKin: row.nextOfKin } ;
  return { profile: p };
};


