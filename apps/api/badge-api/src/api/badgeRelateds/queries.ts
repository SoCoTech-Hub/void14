import { db } from '@soco/badge-db/client'
import { eq } from '@soco/badge-db'
import {
	type BadgeRelatedId,
	badgeRelatedIdSchema,
	badgeRelateds
} from '@soco/badge-db/schema/badgeRelateds'
import { badges } from '@soco/badge-db/schema/badges'

export const getBadgeRelateds = async () => {
	const rows = await db
		.select({
			badgeRelated: badgeRelateds,
			badge: badges,
			relatedBadge: badges
		})
		.from(badgeRelateds)
		.leftJoin(badges, eq(badgeRelateds.badgeId, badges.id))
		.leftJoin(badges, eq(badgeRelateds.relatedBadgeId, badges.id))
	const b = rows.map((r) => ({
		...r.badgeRelated,
		badge: r.badge,
		relatedBadge: r.relatedBadge
	}))
	return { badgeRelateds: b }
}

export const getBadgeRelatedById = async (id: BadgeRelatedId) => {
	const { id: badgeRelatedId } = badgeRelatedIdSchema.parse({ id })
	const [row] = await db
		.select({
			badgeRelated: badgeRelateds,
			badge: badges,
			relatedBadge: badges
		})
		.from(badgeRelateds)
		.where(eq(badgeRelateds.id, badgeRelatedId))
		.leftJoin(badges, eq(badgeRelateds.badgeId, badges.id))
		.leftJoin(badges, eq(badgeRelateds.relatedBadgeId, badges.id))
	if (row === undefined) return {}
	const b = { ...row.badgeRelated, badge: row.badge, relatedBadge: row.badge }
	return { badgeRelated: b }
}
