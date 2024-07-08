import { db } from "@soco/profile-db/index";
import { and, eq } from "drizzle-orm";
import { 
  AddressId, 
  NewAddressParams,
  UpdateAddressParams, 
  updateAddressSchema,
  insertAddressSchema, 
  addresses,
  addressIdSchema 
} from "@soco/profile-db/schema/addresses";
import { getUserAuth } from "@/lib/auth/utils";

export const createAddress = async (address: NewAddressParams) => {
  const { session } = await getUserAuth();
  const newAddress = insertAddressSchema.parse({ ...address, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(addresses).values(newAddress).returning();
    return { address: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAddress = async (id: AddressId, address: UpdateAddressParams) => {
  const { session } = await getUserAuth();
  const { id: addressId } = addressIdSchema.parse({ id });
  const newAddress = updateAddressSchema.parse({ ...address, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(addresses)
     .set({...newAddress, updatedAt: new Date() })
     .where(and(eq(addresses.id, addressId!), eq(addresses.userId, session?.user.id!)))
     .returning();
    return { address: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAddress = async (id: AddressId) => {
  const { session } = await getUserAuth();
  const { id: addressId } = addressIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(addresses).where(and(eq(addresses.id, addressId!), eq(addresses.userId, session?.user.id!)))
    .returning();
    return { address: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

