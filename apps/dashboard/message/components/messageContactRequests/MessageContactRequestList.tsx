"use client";
import { CompleteMessageContactRequest } from "@/lib/db/schema/messageContactRequests";
import { trpc } from "@/lib/trpc/client";
import MessageContactRequestModal from "./MessageContactRequestModal";


export default function MessageContactRequestList({ messageContactRequests }: { messageContactRequests: CompleteMessageContactRequest[] }) {
  const { data: m } = trpc.messageContactRequests.getMessageContactRequests.useQuery(undefined, {
    initialData: { messageContactRequests },
    refetchOnMount: false,
  });

  if (m.messageContactRequests.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageContactRequests.map((messageContactRequest) => (
        <MessageContactRequest messageContactRequest={messageContactRequest} key={messageContactRequest.id} />
      ))}
    </ul>
  );
}

const MessageContactRequest = ({ messageContactRequest }: { messageContactRequest: CompleteMessageContactRequest }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageContactRequest.requestedUserId}</div>
      </div>
      <MessageContactRequestModal messageContactRequest={messageContactRequest} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message contact requests
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message contact request.
      </p>
      <div className="mt-6">
        <MessageContactRequestModal emptyState={true} />
      </div>
    </div>
  );
};

