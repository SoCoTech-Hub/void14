import MessageinboundMessagelistList from "@/components/messageinboundMessagelists/MessageinboundMessagelistList";
import NewMessageinboundMessagelistModal from "@/components/messageinboundMessagelists/MessageinboundMessagelistModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MessageinboundMessagelists() {
  await checkAuth();
  const { messageinboundMessagelists } = await api.messageinboundMessagelists.getMessageinboundMessagelists.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Messageinbound Messagelists</h1>
        <NewMessageinboundMessagelistModal />
      </div>
      <MessageinboundMessagelistList messageinboundMessagelists={messageinboundMessagelists} />
    </main>
  );
}
