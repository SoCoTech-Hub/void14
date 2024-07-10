import {
	getAdminpresetsAppItById,
	getAdminpresetsAppIts
} from '../api/adminpresetsAppIts/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	adminpresetsAppItIdSchema,
	insertAdminpresetsAppItParams,
	updateAdminpresetsAppItParams
} from '@soco/admin-preset-db/schema/adminpresetsAppIts'
import {
	createAdminpresetsAppIt,
	deleteAdminpresetsAppIt,
	updateAdminpresetsAppIt
} from '../api/adminpresetsAppIts/mutations'

export const adminpresetsAppItsRouter =createTRPCRouter({
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
