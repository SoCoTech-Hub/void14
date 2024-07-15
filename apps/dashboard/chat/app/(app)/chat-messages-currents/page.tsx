import ChatMessagesCurrentList from "@/components/chatMessagesCurrents/ChatMessagesCurrentList";
import NewChatMessagesCurrentModal from "@/components/chatMessagesCurrents/ChatMessagesCurrentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ChatMessagesCurrents() {
  await checkAuth();
  const { chatMessagesCurrents } = await api.chatMessagesCurrents.getChatMessagesCurrents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Chat Messages Currents</h1>
        <NewChatMessagesCurrentModal />
      </div>
      <ChatMessagesCurrentList chatMessagesCurrents={chatMessagesCurrents} />
    </main>
  );
}
