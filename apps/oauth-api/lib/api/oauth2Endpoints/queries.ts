import { db } from '@/lib/db/index'
import { eq, and } from 'drizzle-orm'
import { getUserAuth } from '@/lib/auth/utils'
import {
	type Oauth2EndpointId,
	oauth2EndpointIdSchema,
	oauth2Endpoints
} from '@/lib/db/schema/oauth2Endpoints'
import { oauth2issuers } from '@/lib/db/schema/oauth2Issuers'

export const getOauth2Endpoints = async () => {
	const { session } = await getUserAuth()
	const rows = await db
		.select({ oauth2Endpoint: oauth2Endpoints, oauth2issuer: oauth2issuers })
		.from(oauth2Endpoints)
		.leftJoin(
			oauth2issuers,
			eq(oauth2Endpoints.oauth2issuerId, oauth2issuers.id)
		)
		.where(eq(oauth2Endpoints.userId, session?.user.id!))
	const o = rows.map((r) => ({
		...r.oauth2Endpoint,
		oauth2issuer: r.oauth2issuer
	}))
	return { oauth2Endpoints: o }
}

export const getOauth2EndpointById = async (id: Oauth2EndpointId) => {
	const { session } = await getUserAuth()
	const { id: oauth2EndpointId } = oauth2EndpointIdSchema.parse({ id })
	const [row] = await db
		.select({ oauth2Endpoint: oauth2Endpoints, oauth2issuer: oauth2issuers })
		.from(oauth2Endpoints)
		.where(
			and(
				eq(oauth2Endpoints.id, oauth2EndpointId),
				eq(oauth2Endpoints.userId, session?.user.id!)
			)
		)
		.leftJoin(
			oauth2issuers,
			eq(oauth2Endpoints.oauth2issuerId, oauth2issuers.id)
		)
	if (row === undefined) return {}
	const o = { ...row.oauth2Endpoint, oauth2issuer: row.oauth2issuer }
	return { oauth2Endpoint: o }
}
