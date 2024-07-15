"use server";

import { revalidatePath } from "next/cache";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "@/lib/api/addresses/mutations";
import {
  AddressId,
  NewAddressParams,
  UpdateAddressParams,
  addressIdSchema,
  insertAddressParams,
  updateAddressParams,
} from "@/lib/db/schema/addresses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAddresses = () => revalidatePath("/addresses");

export const createAddressAction = async (input: NewAddressParams) => {
  try {
    const payload = insertAddressParams.parse(input);
    await createAddress(payload);
    revalidateAddresses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAddressAction = async (input: UpdateAddressParams) => {
  try {
    const payload = updateAddressParams.parse(input);
    await updateAddress(payload.id, payload);
    revalidateAddresses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAddressAction = async (input: AddressId) => {
  try {
    const payload = addressIdSchema.parse({ id: input });
    await deleteAddress(payload.id);
    revalidateAddresses();
  } catch (e) {
    return handleErrors(e);
  }
};
