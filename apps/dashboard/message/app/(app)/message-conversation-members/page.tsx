import MessageConversationMemberList from "@/components/messageConversationMembers/MessageConversationMemberList";
import NewMessageConversationMemberModal from "@/components/messageConversationMembers/MessageConversationMemberModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MessageConversationMembers() {
  await checkAuth();
  const { messageConversationMembers } = await api.messageConversationMembers.getMessageConversationMembers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Conversation Members</h1>
        <NewMessageConversationMemberModal />
      </div>
      <MessageConversationMemberList messageConversationMembers={messageConversationMembers} />
    </main>
  );
}
