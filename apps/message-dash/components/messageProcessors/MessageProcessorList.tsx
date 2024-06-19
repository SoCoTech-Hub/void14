"use client";
import { CompleteMessageProcessor } from "@/lib/db/schema/messageProcessors";
import { trpc } from "@/lib/trpc/client";
import MessageProcessorModal from "./MessageProcessorModal";


export default function MessageProcessorList({ messageProcessors }: { messageProcessors: CompleteMessageProcessor[] }) {
  const { data: m } = trpc.messageProcessors.getMessageProcessors.useQuery(undefined, {
    initialData: { messageProcessors },
    refetchOnMount: false,
  });

  if (m.messageProcessors.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageProcessors.map((messageProcessor) => (
        <MessageProcessor messageProcessor={messageProcessor} key={messageProcessor.id} />
      ))}
    </ul>
  );
}

const MessageProcessor = ({ messageProcessor }: { messageProcessor: CompleteMessageProcessor }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageProcessor.enabled}</div>
      </div>
      <MessageProcessorModal messageProcessor={messageProcessor} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message processors
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message processor.
      </p>
      <div className="mt-6">
        <MessageProcessorModal emptyState={true} />
      </div>
    </div>
  );
};

