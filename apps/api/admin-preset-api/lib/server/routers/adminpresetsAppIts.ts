import {
	getAdminpresetsAppItById,
	getAdminpresetsAppIts
} from '@/lib/api/adminpresetsAppIts/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	adminpresetsAppItIdSchema,
	insertAdminpresetsAppItParams,
	updateAdminpresetsAppItParams
} from '@/lib/db/schema/adminpresetsAppIts'
import {
	createAdminpresetsAppIt,
	deleteAdminpresetsAppIt,
	updateAdminpresetsAppIt
} from '@/lib/api/adminpresetsAppIts/mutations'

export const adminpresetsAppItsRouter = router({
	getAdminpresetsAppIts: publicProcedure.query(async () => {
		return getAdminpresetsAppIts()
	}),
	getAdminpresetsAppItById: publicProcedure
		.input(adminpresetsAppItIdSchema)
		.query(async ({ input }) => {
			return getAdminpresetsAppItById(input.id)
		}),
	createAdminpresetsAppIt: publicProcedure
		.input(insertAdminpresetsAppItParams)
		.mutation(async ({ input }) => {
			return createAdminpresetsAppIt(input)
		}),
	updateAdminpresetsAppIt: publicProcedure
		.input(updateAdminpresetsAppItParams)
		.mutation(async ({ input }) => {
			return updateAdminpresetsAppIt(input.id, input)
		}),
	deleteAdminpresetsAppIt: publicProcedure
		.input(adminpresetsAppItIdSchema)
		.mutation(async ({ input }) => {
			return deleteAdminpresetsAppIt(input.id)
		})
})
