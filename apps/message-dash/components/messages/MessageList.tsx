"use client";
import { CompleteMessage } from "@/lib/db/schema/messages";
import { trpc } from "@/lib/trpc/client";
import MessageModal from "./MessageModal";


export default function MessageList({ messages }: { messages: CompleteMessage[] }) {
  const { data: m } = trpc.messages.getMessages.useQuery(undefined, {
    initialData: { messages },
    refetchOnMount: false,
  });

  if (m.messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </ul>
  );
}

const Message = ({ message }: { message: CompleteMessage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{message.component}</div>
      </div>
      <MessageModal message={message} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No messages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message.
      </p>
      <div className="mt-6">
        <MessageModal emptyState={true} />
      </div>
    </div>
  );
};

