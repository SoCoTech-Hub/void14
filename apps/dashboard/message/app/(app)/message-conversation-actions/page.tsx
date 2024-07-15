import MessageConversationActionList from "@/components/messageConversationActions/MessageConversationActionList";
import NewMessageConversationActionModal from "@/components/messageConversationActions/MessageConversationActionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MessageConversationActions() {
  await checkAuth();
  const { messageConversationActions } = await api.messageConversationActions.getMessageConversationActions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Conversation Actions</h1>
        <NewMessageConversationActionModal />
      </div>
      <MessageConversationActionList messageConversationActions={messageConversationActions} />
    </main>
  );
}
