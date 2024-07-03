import MessageinboundHandlerList from "@/components/messageinboundHandlers/MessageinboundHandlerList";
import NewMessageinboundHandlerModal from "@/components/messageinboundHandlers/MessageinboundHandlerModal";
import { api } from "@/lib/trpc/api";

export default async function MessageinboundHandlers() {
  const { messageinboundHandlers } = await api.messageinboundHandlers.getMessageinboundHandlers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Messageinbound Handlers</h1>
        <NewMessageinboundHandlerModal />
      </div>
      <MessageinboundHandlerList messageinboundHandlers={messageinboundHandlers} />
    </main>
  );
}
