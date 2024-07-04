import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type AddressId, addressIdSchema, addresses } from "@/lib/db/schema/addresses";

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


