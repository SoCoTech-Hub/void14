import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EnrolLtiUserResourceLinkId, enrolLtiUserResourceLinkIdSchema, enrolLtiUserResourceLinks } from "@/lib/db/schema/enrolLtiUserResourceLinks";
import { enrolLtiUsers } from "@/lib/db/schema/enrolLtiUsers";
import { enrolLtiResourceLinks } from "@/lib/db/schema/enrolLtiResourceLinks";

export const getEnrolLtiUserResourceLinks = async () => {
  const rows = await db.select({ enrolLtiUserResourceLink: enrolLtiUserResourceLinks, enrolLtiUser: enrolLtiUsers, enrolLtiResourceLink: enrolLtiResourceLinks }).from(enrolLtiUserResourceLinks).leftJoin(enrolLtiUsers, eq(enrolLtiUserResourceLinks.enrolLtiUserId, enrolLtiUsers.id)).leftJoin(enrolLtiResourceLinks, eq(enrolLtiUserResourceLinks.enrolLtiResourceLinkId, enrolLtiResourceLinks.id));
  const e = rows .map((r) => ({ ...r.enrolLtiUserResourceLink, enrolLtiUser: r.enrolLtiUser, enrolLtiResourceLink: r.enrolLtiResourceLink})); 
  return { enrolLtiUserResourceLinks: e };
};

export const getEnrolLtiUserResourceLinkById = async (id: EnrolLtiUserResourceLinkId) => {
  const { id: enrolLtiUserResourceLinkId } = enrolLtiUserResourceLinkIdSchema.parse({ id });
  const [row] = await db.select({ enrolLtiUserResourceLink: enrolLtiUserResourceLinks, enrolLtiUser: enrolLtiUsers, enrolLtiResourceLink: enrolLtiResourceLinks }).from(enrolLtiUserResourceLinks).where(eq(enrolLtiUserResourceLinks.id, enrolLtiUserResourceLinkId)).leftJoin(enrolLtiUsers, eq(enrolLtiUserResourceLinks.enrolLtiUserId, enrolLtiUsers.id)).leftJoin(enrolLtiResourceLinks, eq(enrolLtiUserResourceLinks.enrolLtiResourceLinkId, enrolLtiResourceLinks.id));
  if (row === undefined) return {};
  const e =  { ...row.enrolLtiUserResourceLink, enrolLtiUser: row.enrolLtiUser, enrolLtiResourceLink: row.enrolLtiResourceLink } ;
  return { enrolLtiUserResourceLink: e };
};


