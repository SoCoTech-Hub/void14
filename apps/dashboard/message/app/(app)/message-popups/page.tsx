import MessagePopupList from "@/components/messagePopups/MessagePopupList";
import NewMessagePopupModal from "@/components/messagePopups/MessagePopupModal";
import { api } from "@/lib/trpc/api";

export default async function MessagePopups() {
  const { messagePopups } = await api.messagePopups.getMessagePopups.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Popups</h1>
        <NewMessagePopupModal />
      </div>
      <MessagePopupList messagePopups={messagePopups} />
    </main>
  );
}
