import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { type EnrolLtiLti2ResourceLinkId, enrolLtiLti2ResourceLinkIdSchema, enrolLtiLti2ResourceLinks } from "@soco/enrol-db/schema/enrolLtiLti2ResourceLinks";

export const getEnrolLtiLti2ResourceLinks = async () => {
  const rows = await db.select().from(enrolLtiLti2ResourceLinks);
  const e = rows
  return { enrolLtiLti2ResourceLinks: e };
};

export const getEnrolLtiLti2ResourceLinkById = async (id: EnrolLtiLti2ResourceLinkId) => {
  const { id: enrolLtiLti2ResourceLinkId } = enrolLtiLti2ResourceLinkIdSchema.parse({ id });
  const [row] = await db.select().from(enrolLtiLti2ResourceLinks).where(eq(enrolLtiLti2ResourceLinks.id, enrolLtiLti2ResourceLinkId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2ResourceLink: e };
};


