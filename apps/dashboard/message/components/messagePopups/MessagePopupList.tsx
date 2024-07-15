"use client";
import { CompleteMessagePopup } from "@soco/message-db/schema/messagePopups";
import { trpc } from "@/lib/trpc/client";
import MessagePopupModal from "./MessagePopupModal";


export default function MessagePopupList({ messagePopups }: { messagePopups: CompleteMessagePopup[] }) {
  const { data: m } = trpc.messagePopups.getMessagePopups.useQuery(undefined, {
    initialData: { messagePopups },
    refetchOnMount: false,
  });

  if (m.messagePopups.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messagePopups.map((messagePopup) => (
        <MessagePopup messagePopup={messagePopup} key={messagePopup.messagePopup.id} />
      ))}
    </ul>
  );
}

const MessagePopup = ({ messagePopup }: { messagePopup: CompleteMessagePopup }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messagePopup.messagePopup.isRead}</div>
      </div>
      <MessagePopupModal messagePopup={messagePopup.messagePopup} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message popups
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message popup.
      </p>
      <div className="mt-6">
        <MessagePopupModal emptyState={true} />
      </div>
    </div>
  );
};

