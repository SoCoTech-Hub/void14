import { eq } from "drizzle-orm";

import type { MassMailListsRecipientId } from "../db/schema/massMailListsRecipients";
import { db } from "../db/index";
import { massMailLists } from "../db/schema/massMailLists";
import {
  massMailListsRecipientIdSchema,
  massMailListsRecipients,
} from "../db/schema/massMailListsRecipients";
import { massMailRecipients } from "../db/schema/massMailRecipients";

export const getMassMailListsRecipients = async () => {
  const rows = await db
    .select({
      massMailListsRecipient: massMailListsRecipients,
      massMailList: massMailLists,
      massMailRecipient: massMailRecipients,
    })
    .from(massMailListsRecipients)
    .leftJoin(
      massMailLists,
      eq(massMailListsRecipients.massMailListId, massMailLists.id),
    )
    .leftJoin(
      massMailRecipients,
      eq(massMailListsRecipients.massMailRecipientId, massMailRecipients.id),
    );
  const m = rows.map((r) => ({
    ...r.massMailListsRecipient,
    massMailList: r.massMailList,
    massMailRecipient: r.massMailRecipient,
  }));
  return { massMailListsRecipients: m };
};

export const getMassMailListsRecipientById = async (
  id: MassMailListsRecipientId,
) => {
  const { id: massMailListsRecipientId } = massMailListsRecipientIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select({
      massMailListsRecipient: massMailListsRecipients,
      massMailList: massMailLists,
      massMailRecipient: massMailRecipients,
    })
    .from(massMailListsRecipients)
    .where(eq(massMailListsRecipients.id, massMailListsRecipientId))
    .leftJoin(
      massMailLists,
      eq(massMailListsRecipients.massMailListId, massMailLists.id),
    )
    .leftJoin(
      massMailRecipients,
      eq(massMailListsRecipients.massMailRecipientId, massMailRecipients.id),
    );
  if (row === undefined) return {};
  const m = {
    ...row.massMailListsRecipient,
    massMailList: row.massMailList,
    massMailRecipient: row.massMailRecipient,
  };
  return { massMailListsRecipient: m };
};
