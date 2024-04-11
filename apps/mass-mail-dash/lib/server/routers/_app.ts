import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { massMailListsRouter } from './massMailLists'
import { massMailRecipientsRouter } from './massMailRecipients'
import { massMailMessagesRouter } from './massMailMessages'
import { massMailListsRecipientsRouter } from './massMailListsRecipients'

export const appRouter = router({
	computers: computersRouter,
	massMailLists: massMailListsRouter,
	massMailRecipients: massMailRecipientsRouter,
	massMailMessages: massMailMessagesRouter,
	massMailListsRecipients: massMailListsRecipientsRouter
})

export type AppRouter = typeof appRouter
