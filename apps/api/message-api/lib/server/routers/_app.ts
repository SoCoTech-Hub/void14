import { computersRouter } from './computers'
import { router } from '../server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { messagesRouter } from "./messages";
import { messageAirnotifierDevicesRouter } from "./messageAirnotifierDevices";
import { messageContactRequestsRouter } from "./messageContactRequests";
import { messageContactsRouter } from "./messageContacts";
import { messageConversationActionsRouter } from "./messageConversationActions";
import { messageConversationMembersRouter } from "./messageConversationMembers";
import { messageConversationsRouter } from "./messageConversations";
import { messageEmailMessagesRouter } from "./messageEmailMessages";
import { messagePopupsRouter } from "./messagePopups";
import { messagePopupNotificationsRouter } from "./messagePopupNotifications";
import { messageProcessorsRouter } from "./messageProcessors";
import { messageProvidersRouter } from "./messageProviders";
import { messageReadsRouter } from "./messageReads";
import { messageUserActionsRouter } from "./messageUserActions";
import { messageUsersBlockedsRouter } from "./messageUsersBlockeds";
import { messageinboundDatakeysRouter } from "./messageinboundDatakeys";
import { messageinboundHandlersRouter } from "./messageinboundHandlers";
import { messageinboundMessagelistsRouter } from "./messageinboundMessagelists";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  messages: messagesRouter,
  messageAirnotifierDevices: messageAirnotifierDevicesRouter,
  messageContactRequests: messageContactRequestsRouter,
  messageContacts: messageContactsRouter,
  messageConversationActions: messageConversationActionsRouter,
  messageConversationMembers: messageConversationMembersRouter,
  messageConversations: messageConversationsRouter,
  messageEmailMessages: messageEmailMessagesRouter,
  messagePopups: messagePopupsRouter,
  messagePopupNotifications: messagePopupNotificationsRouter,
  messageProcessors: messageProcessorsRouter,
  messageProviders: messageProvidersRouter,
  messageReads: messageReadsRouter,
  messageUserActions: messageUserActionsRouter,
  messageUsersBlockeds: messageUsersBlockedsRouter,
  messageinboundDatakeys: messageinboundDatakeysRouter,
  messageinboundHandlers: messageinboundHandlersRouter,
  messageinboundMessagelists: messageinboundMessagelistsRouter,
