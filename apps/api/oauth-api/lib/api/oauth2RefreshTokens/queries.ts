import { db } from '@/lib/db/index'
import { eq, and } from 'drizzle-orm'
import { getUserAuth } from '@/lib/auth/utils'
import {
	type Oauth2RefreshTokenId,
	oauth2RefreshTokenIdSchema,
	oauth2RefreshTokens
} from '@/lib/db/schema/oauth2RefreshTokens'
import { oauth2issuers } from '@/lib/db/schema/oauth2Issuers'

export const getOauth2RefreshTokens = async () => {
	const { session } = await getUserAuth()
	const rows = await db
		.select({
			oauth2RefreshToken: oauth2RefreshTokens,
			oauth2issuer: oauth2issuers
		})
		.from(oauth2RefreshTokens)
		.leftJoin(
			oauth2issuers,
			eq(oauth2RefreshTokens.oauth2issuerId, oauth2issuers.id)
		)
		.where(eq(oauth2RefreshTokens.userId, session?.user.id!))
	const o = rows.map((r) => ({
		...r.oauth2RefreshToken,
		oauth2issuer: r.oauth2issuer
	}))
	return { oauth2RefreshTokens: o }
}

export const getOauth2RefreshTokenById = async (id: Oauth2RefreshTokenId) => {
	const { session } = await getUserAuth()
	const { id: oauth2RefreshTokenId } = oauth2RefreshTokenIdSchema.parse({ id })
	const [row] = await db
		.select({
			oauth2RefreshToken: oauth2RefreshTokens,
			oauth2issuer: oauth2issuers
		})
		.from(oauth2RefreshTokens)
		.where(
			and(
				eq(oauth2RefreshTokens.id, oauth2RefreshTokenId),
				eq(oauth2RefreshTokens.userId, session?.user.id!)
			)
		)
		.leftJoin(
			oauth2issuers,
			eq(oauth2RefreshTokens.oauth2issuerId, oauth2issuers.id)
		)
	if (row === undefined) return {}
	const o = { ...row.oauth2RefreshToken, oauth2issuer: row.oauth2issuer }
	return { oauth2RefreshToken: o }
}
