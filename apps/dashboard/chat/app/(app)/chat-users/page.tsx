import ChatUserList from "@/components/chatUsers/ChatUserList";
import NewChatUserModal from "@/components/chatUsers/ChatUserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ChatUsers() {
  await checkAuth();
  const { chatUsers } = await api.chatUsers.getChatUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Chat Users</h1>
        <NewChatUserModal />
      </div>
      <ChatUserList chatUsers={chatUsers} />
    </main>
  );
}
