"use client";
import { CompleteMessagePopupNotification } from "@soco/message-db/schema/messagePopupNotifications";
import { trpc } from "@/lib/trpc/client";
import MessagePopupNotificationModal from "./MessagePopupNotificationModal";


export default function MessagePopupNotificationList({ messagePopupNotifications }: { messagePopupNotifications: CompleteMessagePopupNotification[] }) {
  const { data: m } = trpc.messagePopupNotifications.getMessagePopupNotifications.useQuery(undefined, {
    initialData: { messagePopupNotifications },
    refetchOnMount: false,
  });

  if (m.messagePopupNotifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messagePopupNotifications.map((messagePopupNotification) => (
        <MessagePopupNotification messagePopupNotification={messagePopupNotification} key={messagePopupNotification.id} />
      ))}
    </ul>
  );
}

const MessagePopupNotification = ({ messagePopupNotification }: { messagePopupNotification: CompleteMessagePopupNotification }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messagePopupNotification.notificationId}</div>
      </div>
      <MessagePopupNotificationModal messagePopupNotification={messagePopupNotification} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message popup notifications
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message popup notification.
      </p>
      <div className="mt-6">
        <MessagePopupNotificationModal emptyState={true} />
      </div>
    </div>
  );
};

