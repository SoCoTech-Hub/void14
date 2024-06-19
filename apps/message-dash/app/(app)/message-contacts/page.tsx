import MessageContactList from "@/components/messageContacts/MessageContactList";
import NewMessageContactModal from "@/components/messageContacts/MessageContactModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function MessageContacts() {
  await checkAuth();
  const { messageContacts } = await api.messageContacts.getMessageContacts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Contacts</h1>
        <NewMessageContactModal />
      </div>
      <MessageContactList messageContacts={messageContacts} />
    </main>
  );
}
