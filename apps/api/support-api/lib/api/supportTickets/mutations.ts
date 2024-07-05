import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertSupportTicketSchema,
  NewSupportTicketParams,
  SupportTicketId,
  supportTicketIdSchema,
  supportTickets,
  UpdateSupportTicketParams,
  updateSupportTicketSchema,
} from "../../db/schema/supportTickets";

export const createSupportTicket = async (
  supportTicket: NewSupportTicketParams,
) => {
  const { session } = await getUserAuth();
  const newSupportTicket = insertSupportTicketSchema.parse({
    ...supportTicket,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(supportTickets)
      .values(newSupportTicket)
      .returning();
    return { supportTicket: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSupportTicket = async (
  id: SupportTicketId,
  supportTicket: UpdateSupportTicketParams,
) => {
  const { session } = await getUserAuth();
  const { id: supportTicketId } = supportTicketIdSchema.parse({ id });
  const newSupportTicket = updateSupportTicketSchema.parse({
    ...supportTicket,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(supportTickets)
      .set({ ...newSupportTicket, updatedAt: new Date() })
      .where(
        and(
          eq(supportTickets.id, supportTicketId!),
          eq(supportTickets.userId, session?.user.id!),
        ),
      )
      .returning();
    return { supportTicket: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSupportTicket = async (id: SupportTicketId) => {
  const { session } = await getUserAuth();
  const { id: supportTicketId } = supportTicketIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(supportTickets)
      .where(
        and(
          eq(supportTickets.id, supportTicketId!),
          eq(supportTickets.userId, session?.user.id!),
        ),
      )
      .returning();
    return { supportTicket: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
