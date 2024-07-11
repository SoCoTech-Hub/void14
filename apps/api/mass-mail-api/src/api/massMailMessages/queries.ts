import type { MassMailMessageId } from "@soco/mass-mail-db/schema/massMailMessages";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/mass-mail-db";
import { db } from "@soco/mass-mail-db/client";
import { massMailLists } from "@soco/mass-mail-db/schema/massMailLists";
import {
  massMailMessageIdSchema,
  massMailMessages,
} from "@soco/mass-mail-db/schema/massMailMessages";

export const getMassMailMessages = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ massMailMessage: massMailMessages, massMailList: massMailLists })
    .from(massMailMessages)
    .leftJoin(
      massMailLists,
      eq(massMailMessages.massMailListId, massMailLists.id),
    )
    .where(eq(massMailMessages.userId, session?.user.id!));
  const m = rows.map((r) => ({
    ...r.massMailMessage,
    massMailList: r.massMailList,
  }));
  return { massMailMessages: m };
};

export const getMassMailMessageById = async (id: MassMailMessageId) => {
  const { session } = await getUserAuth();
  const { id: massMailMessageId } = massMailMessageIdSchema.parse({ id });
  const [row] = await db
    .select({ massMailMessage: massMailMessages, massMailList: massMailLists })
    .from(massMailMessages)
    .where(
      and(
        eq(massMailMessages.id, massMailMessageId),
        eq(massMailMessages.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      massMailLists,
      eq(massMailMessages.massMailListId, massMailLists.id),
    );
  if (row === undefined) return {};
  const m = { ...row.massMailMessage, massMailList: row.massMailList };
  return { massMailMessage: m };
};
