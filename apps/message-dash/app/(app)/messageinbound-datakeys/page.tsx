import MessageinboundDatakeyList from "@/components/messageinboundDatakeys/MessageinboundDatakeyList";
import NewMessageinboundDatakeyModal from "@/components/messageinboundDatakeys/MessageinboundDatakeyModal";
import { api } from "@/lib/trpc/api";

export default async function MessageinboundDatakeys() {
  const { messageinboundDatakeys } = await api.messageinboundDatakeys.getMessageinboundDatakeys.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Messageinbound Datakeys</h1>
        <NewMessageinboundDatakeyModal />
      </div>
      <MessageinboundDatakeyList messageinboundDatakeys={messageinboundDatakeys} />
    </main>
  );
}
