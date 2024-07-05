import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { MassMailRecipientId } from "../../db/schema/massMailRecipients";
import { db } from "../../db/index";
import {
  massMailRecipientIdSchema,
  massMailRecipients,
} from "../../db/schema/massMailRecipients";

export const getMassMailRecipients = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(massMailRecipients)
    .where(eq(massMailRecipients.userId, session?.user.id!));
  const m = rows;
  return { massMailRecipients: m };
};

export const getMassMailRecipientById = async (id: MassMailRecipientId) => {
  const { session } = await getUserAuth();
  const { id: massMailRecipientId } = massMailRecipientIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(massMailRecipients)
    .where(
      and(
        eq(massMailRecipients.id, massMailRecipientId),
        eq(massMailRecipients.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { massMailRecipient: m };
};
