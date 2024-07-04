import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type SupportCommentId, supportCommentIdSchema, supportComments } from "@/lib/db/schema/supportComments";
import { supportTickets } from "@/lib/db/schema/supportTickets";

export const getSupportComments = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ supportComment: supportComments, supportTicket: supportTickets }).from(supportComments).leftJoin(supportTickets, eq(supportComments.supportTicketId, supportTickets.id)).where(eq(supportComments.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.supportComment, supportTicket: r.supportTicket})); 
  return { supportComments: s };
};

export const getSupportCommentById = async (id: SupportCommentId) => {
  const { session } = await getUserAuth();
  const { id: supportCommentId } = supportCommentIdSchema.parse({ id });
  const [row] = await db.select({ supportComment: supportComments, supportTicket: supportTickets }).from(supportComments).where(and(eq(supportComments.id, supportCommentId), eq(supportComments.userId, session?.user.id!))).leftJoin(supportTickets, eq(supportComments.supportTicketId, supportTickets.id));
  if (row === undefined) return {};
  const s =  { ...row.supportComment, supportTicket: row.supportTicket } ;
  return { supportComment: s };
};


