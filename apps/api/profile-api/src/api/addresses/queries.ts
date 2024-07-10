import { db } from "@soco/profile-db/client";
import { eq, and } from "@soco/profile-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type AddressId, addressIdSchema, addresses } from "@soco/profile-db/schema/addresses";

export const getAddresses = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(addresses).where(eq(addresses.userId, session?.user.id!));
  const a = rows
  return { addresses: a };
};

export const getAddressById = async (id: AddressId) => {
  const { session } = await getUserAuth();
  const { id: addressId } = addressIdSchema.parse({ id });
  const [row] = await db.select().from(addresses).where(and(eq(addresses.id, addressId), eq(addresses.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { address: a };
};


