import MessageProcessorList from "@/components/messageProcessors/MessageProcessorList";
import NewMessageProcessorModal from "@/components/messageProcessors/MessageProcessorModal";
import { api } from "@/lib/trpc/api";

export default async function MessageProcessors() {
  const { messageProcessors } = await api.messageProcessors.getMessageProcessors.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Processors</h1>
        <NewMessageProcessorModal />
      </div>
      <MessageProcessorList messageProcessors={messageProcessors} />
    </main>
  );
}
