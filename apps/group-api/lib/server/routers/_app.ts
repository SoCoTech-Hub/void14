import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { groupingsRouter } from "./groupings";
import { groupsRouter } from "./groups";
import { groupingsGroupsRouter } from "./groupingsGroups";
import { groupsMembersRouter } from "./groupsMembers";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  groupings: groupingsRouter,
  groups: groupsRouter,
  groupingsGroups: groupingsGroupsRouter,
  groupsMembers: groupsMembersRouter,
