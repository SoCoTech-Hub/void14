import type { Oauth2EndpointId } from "@soco/oauth2-db/schema/oauth2Endpoints";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/oauth2-db";
import { db } from "@soco/oauth2-db/client";
import {
  oauth2EndpointIdSchema,
  oauth2Endpoints,
} from "@soco/oauth2-db/schema/oauth2Endpoints";
import { oauth2issuers } from "@soco/oauth2-db/schema/oauth2issuers";

export const getOauth2Endpoints = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ oauth2Endpoint: oauth2Endpoints, oauth2issuer: oauth2issuers })
    .from(oauth2Endpoints)
    .leftJoin(
      oauth2issuers,
      eq(oauth2Endpoints.oauth2issuerId, oauth2issuers.id),
    )
    .where(eq(oauth2Endpoints.userId, session?.user.id!));
  const o = rows.map((r) => ({
    ...r.oauth2Endpoint,
    oauth2issuer: r.oauth2issuer,
  }));
  return { oauth2Endpoints: o };
};

export const getOauth2EndpointById = async (id: Oauth2EndpointId) => {
  const { session } = await getUserAuth();
  const { id: oauth2EndpointId } = oauth2EndpointIdSchema.parse({ id });
  const [row] = await db
    .select({ oauth2Endpoint: oauth2Endpoints, oauth2issuer: oauth2issuers })
    .from(oauth2Endpoints)
    .where(
      and(
        eq(oauth2Endpoints.id, oauth2EndpointId),
        eq(oauth2Endpoints.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      oauth2issuers,
      eq(oauth2Endpoints.oauth2issuerId, oauth2issuers.id),
    );
  if (row === undefined) return {};
  const o = { ...row.oauth2Endpoint, oauth2issuer: row.oauth2issuer };
  return { oauth2Endpoint: o };
};
