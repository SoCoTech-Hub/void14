import type { SupportCommentId } from "@soco/support-db/schema/supportComments";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/support-db";
import { db } from "@soco/support-db/client";
import {
  supportCommentIdSchema,
  supportComments,
} from "@soco/support-db/schema/supportComments";
import { supportTickets } from "@soco/support-db/schema/supportTickets";

export const getSupportComments = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ supportComment: supportComments, supportTicket: supportTickets })
    .from(supportComments)
    .leftJoin(
      supportTickets,
      eq(supportComments.supportTicketId, supportTickets.id),
    )
    .where(eq(supportComments.userId, session?.user.id!));
  const s = rows.map((r) => ({
    ...r.supportComment,
    supportTicket: r.supportTicket,
  }));
  return { supportComments: s };
};

export const getSupportCommentById = async (id: SupportCommentId) => {
  const { session } = await getUserAuth();
  const { id: supportCommentId } = supportCommentIdSchema.parse({ id });
  const [row] = await db
    .select({ supportComment: supportComments, supportTicket: supportTickets })
    .from(supportComments)
    .where(
      and(
        eq(supportComments.id, supportCommentId),
        eq(supportComments.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      supportTickets,
      eq(supportComments.supportTicketId, supportTickets.id),
    );
  if (row === undefined) return {};
  const s = { ...row.supportComment, supportTicket: row.supportTicket };
  return { supportComment: s };
};
