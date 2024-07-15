import MessageList from "@/components/messages/MessageList";
import NewMessageModal from "@/components/messages/MessageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Messages() {
  await checkAuth();
  const { messages } = await api.messages.getMessages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Messages</h1>
        <NewMessageModal />
      </div>
      <MessageList messages={messages} />
    </main>
  );
}
