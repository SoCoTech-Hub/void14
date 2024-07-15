import MessageContactRequestList from "@/components/messageContactRequests/MessageContactRequestList";
import NewMessageContactRequestModal from "@/components/messageContactRequests/MessageContactRequestModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MessageContactRequests() {
  await checkAuth();
  const { messageContactRequests } = await api.messageContactRequests.getMessageContactRequests.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Contact Requests</h1>
        <NewMessageContactRequestModal />
      </div>
      <MessageContactRequestList messageContactRequests={messageContactRequests} />
    </main>
  );
}
