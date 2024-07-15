"use client";
import { CompleteMessageEmailMessage } from "@soco/message-db/schema/messageEmailMessages";
import { trpc } from "@/lib/trpc/client";
import MessageEmailMessageModal from "./MessageEmailMessageModal";


export default function MessageEmailMessageList({ messageEmailMessages }: { messageEmailMessages: CompleteMessageEmailMessage[] }) {
  const { data: m } = trpc.messageEmailMessages.getMessageEmailMessages.useQuery(undefined, {
    initialData: { messageEmailMessages },
    refetchOnMount: false,
  });

  if (m.messageEmailMessages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageEmailMessages.map((messageEmailMessage) => (
        <MessageEmailMessage messageEmailMessage={messageEmailMessage} key={messageEmailMessage.id} />
      ))}
    </ul>
  );
}

const MessageEmailMessage = ({ messageEmailMessage }: { messageEmailMessage: CompleteMessageEmailMessage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageEmailMessage.conversationId}</div>
      </div>
      <MessageEmailMessageModal messageEmailMessage={messageEmailMessage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message email messages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message email message.
      </p>
      <div className="mt-6">
        <MessageEmailMessageModal emptyState={true} />
      </div>
    </div>
  );
};

