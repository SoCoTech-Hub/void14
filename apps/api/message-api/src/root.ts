import { messageAirnotifierDevicesRouter } from './routers/messageAirnotifierDevices';
import { messageContactRequestsRouter } from './routers/messageContactRequests';
import { messageContactsRouter } from './routers/messageContacts';
import { messageConversationActionsRouter } from './routers/messageConversationActions';
import { messageConversationMembersRouter } from './routers/messageConversationMembers';
import { messageConversationsRouter } from './routers/messageConversations';
import { messageEmailMessagesRouter } from './routers/messageEmailMessages';
import { messageinboundDatakeysRouter } from './routers/messageinboundDatakeys';
import { messageinboundHandlersRouter } from './routers/messageinboundHandlers';
import { messageinboundMessagelistsRouter } from './routers/messageinboundMessagelists';
import { messagePopupNotificationsRouter } from './routers/messagePopupNotifications';
import { messagePopupsRouter } from './routers/messagePopups';
import { messageProcessorsRouter } from './routers/messageProcessors';
import { messageProvidersRouter } from './routers/messageProviders';
import { messageReadsRouter } from './routers/messageReads';
import { messagesRouter } from './routers/messages';
import { messageUserActionsRouter } from './routers/messageUserActions';
import { messageUsersBlockedsRouter } from './routers/messageUsersBlockeds';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  messageAirnotifierDevices: messageAirnotifierDevicesRouter,
  messageContactRequests: messageContactRequestsRouter,
  messageContacts: messageContactsRouter,
  messageConversationActions: messageConversationActionsRouter,
  messageConversationMembers: messageConversationMembersRouter,
  messageConversations: messageConversationsRouter,
  messageEmailMessages: messageEmailMessagesRouter,
  messageinboundDatakeys: messageinboundDatakeysRouter,
  messageinboundHandlers: messageinboundHandlersRouter,
  messageinboundMessagelists: messageinboundMessagelistsRouter,
  messagePopupNotifications: messagePopupNotificationsRouter,
  messagePopups: messagePopupsRouter,
  messageProcessors: messageProcessorsRouter,
  messageProviders: messageProvidersRouter,
  messageReads: messageReadsRouter,
  messages: messagesRouter,
  messageUserActions: messageUserActionsRouter,
  messageUsersBlockeds: messageUsersBlockedsRouter,
});

export type AppRouter = typeof appRouter;
