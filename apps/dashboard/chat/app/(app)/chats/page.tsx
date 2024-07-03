import ChatList from "@/components/chats/ChatList";
import NewChatModal from "@/components/chats/ChatModal";
import { api } from "@/lib/trpc/api";

export default async function Chats() {
  const { chats } = await api.chats.getChats.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Chats</h1>
        <NewChatModal />
      </div>
      <ChatList chats={chats} />
    </main>
  );
}
