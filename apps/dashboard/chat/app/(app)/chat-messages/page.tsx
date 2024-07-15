import ChatMessageList from "@/components/chatMessages/ChatMessageList";
import NewChatMessageModal from "@/components/chatMessages/ChatMessageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ChatMessages() {
  await checkAuth();
  const { chatMessages } = await api.chatMessages.getChatMessages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Chat Messages</h1>
        <NewChatMessageModal />
      </div>
      <ChatMessageList chatMessages={chatMessages} />
    </main>
  );
}
