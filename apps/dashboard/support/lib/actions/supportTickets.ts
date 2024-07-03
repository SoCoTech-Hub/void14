"use server";

import { revalidatePath } from "next/cache";
import {
  createSupportTicket,
  deleteSupportTicket,
  updateSupportTicket,
} from "@/lib/api/supportTickets/mutations";
import {
  SupportTicketId,
  NewSupportTicketParams,
  UpdateSupportTicketParams,
  supportTicketIdSchema,
  insertSupportTicketParams,
  updateSupportTicketParams,
} from "@/lib/db/schema/supportTickets";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSupportTickets = () => revalidatePath("/support-tickets");

export const createSupportTicketAction = async (input: NewSupportTicketParams) => {
  try {
    const payload = insertSupportTicketParams.parse(input);
    await createSupportTicket(payload);
    revalidateSupportTickets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSupportTicketAction = async (input: UpdateSupportTicketParams) => {
  try {
    const payload = updateSupportTicketParams.parse(input);
    await updateSupportTicket(payload.id, payload);
    revalidateSupportTickets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSupportTicketAction = async (input: SupportTicketId) => {
  try {
    const payload = supportTicketIdSchema.parse({ id: input });
    await deleteSupportTicket(payload.id);
    revalidateSupportTickets();
  } catch (e) {
    return handleErrors(e);
  }
};