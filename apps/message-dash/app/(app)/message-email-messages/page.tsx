import MessageEmailMessageList from "@/components/messageEmailMessages/MessageEmailMessageList";
import NewMessageEmailMessageModal from "@/components/messageEmailMessages/MessageEmailMessageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function MessageEmailMessages() {
  await checkAuth();
  const { messageEmailMessages } = await api.messageEmailMessages.getMessageEmailMessages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Email Messages</h1>
        <NewMessageEmailMessageModal />
      </div>
      <MessageEmailMessageList messageEmailMessages={messageEmailMessages} />
    </main>
  );
}
