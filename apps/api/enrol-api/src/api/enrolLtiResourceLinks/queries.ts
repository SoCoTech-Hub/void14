import type { EnrolLtiResourceLinkId } from "@soco/enrol-db/schema/enrolLtiResourceLinks";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiResourceLinkIdSchema,
  enrolLtiResourceLinks,
} from "@soco/enrol-db/schema/enrolLtiResourceLinks";

export const getEnrolLtiResourceLinks = async () => {
  const rows = await db.select().from(enrolLtiResourceLinks);
  const e = rows;
  return { enrolLtiResourceLinks: e };
};

export const getEnrolLtiResourceLinkById = async (
  id: EnrolLtiResourceLinkId,
) => {
  const { id: enrolLtiResourceLinkId } = enrolLtiResourceLinkIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(enrolLtiResourceLinks)
    .where(eq(enrolLtiResourceLinks.id, enrolLtiResourceLinkId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiResourceLink: e };
};
