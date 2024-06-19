"use client";
import { CompleteMessageRead } from "@/lib/db/schema/messageReads";
import { trpc } from "@/lib/trpc/client";
import MessageReadModal from "./MessageReadModal";


export default function MessageReadList({ messageReads }: { messageReads: CompleteMessageRead[] }) {
  const { data: m } = trpc.messageReads.getMessageReads.useQuery(undefined, {
    initialData: { messageReads },
    refetchOnMount: false,
  });

  if (m.messageReads.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageReads.map((messageRead) => (
        <MessageRead messageRead={messageRead} key={messageRead.id} />
      ))}
    </ul>
  );
}

const MessageRead = ({ messageRead }: { messageRead: CompleteMessageRead }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageRead.component}</div>
      </div>
      <MessageReadModal messageRead={messageRead} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message reads
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message read.
      </p>
      <div className="mt-6">
        <MessageReadModal emptyState={true} />
      </div>
    </div>
  );
};

