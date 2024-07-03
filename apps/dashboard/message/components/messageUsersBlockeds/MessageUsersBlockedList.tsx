"use client";
import { CompleteMessageUsersBlocked } from "@/lib/db/schema/messageUsersBlockeds";
import { trpc } from "@/lib/trpc/client";
import MessageUsersBlockedModal from "./MessageUsersBlockedModal";


export default function MessageUsersBlockedList({ messageUsersBlockeds }: { messageUsersBlockeds: CompleteMessageUsersBlocked[] }) {
  const { data: m } = trpc.messageUsersBlockeds.getMessageUsersBlockeds.useQuery(undefined, {
    initialData: { messageUsersBlockeds },
    refetchOnMount: false,
  });

  if (m.messageUsersBlockeds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageUsersBlockeds.map((messageUsersBlocked) => (
        <MessageUsersBlocked messageUsersBlocked={messageUsersBlocked} key={messageUsersBlocked.id} />
      ))}
    </ul>
  );
}

const MessageUsersBlocked = ({ messageUsersBlocked }: { messageUsersBlocked: CompleteMessageUsersBlocked }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageUsersBlocked.blockedUserId}</div>
      </div>
      <MessageUsersBlockedModal messageUsersBlocked={messageUsersBlocked} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message users blockeds
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message users blocked.
      </p>
      <div className="mt-6">
        <MessageUsersBlockedModal emptyState={true} />
      </div>
    </div>
  );
};

