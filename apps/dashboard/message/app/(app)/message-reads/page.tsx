import MessageReadList from "@/components/messageReads/MessageReadList";
import NewMessageReadModal from "@/components/messageReads/MessageReadModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function MessageReads() {
  await checkAuth();
  const { messageReads } = await api.messageReads.getMessageReads.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Reads</h1>
        <NewMessageReadModal />
      </div>
      <MessageReadList messageReads={messageReads} />
    </main>
  );
}
