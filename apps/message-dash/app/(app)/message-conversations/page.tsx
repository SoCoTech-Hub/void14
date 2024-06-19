import MessageConversationList from "@/components/messageConversations/MessageConversationList";
import NewMessageConversationModal from "@/components/messageConversations/MessageConversationModal";
import { api } from "@/lib/trpc/api";

export default async function MessageConversations() {
  const { messageConversations } = await api.messageConversations.getMessageConversations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Conversations</h1>
        <NewMessageConversationModal />
      </div>
      <MessageConversationList messageConversations={messageConversations} />
    </main>
  );
}
