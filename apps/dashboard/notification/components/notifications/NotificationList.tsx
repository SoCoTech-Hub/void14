"use client";
import { CompleteNotification } from "@soco/notification-db/schema/notifications";
import { trpc } from "@/lib/trpc/client";
import NotificationModal from "./NotificationModal";


export default function NotificationList({ notifications }: { notifications: CompleteNotification[] }) {
  const { data: n } = trpc.notifications.getNotifications.useQuery(undefined, {
    initialData: { notifications },
    refetchOnMount: false,
  });

  if (n.notifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {n.notifications.map((notification) => (
        <Notification notification={notification} key={notification.id} />
      ))}
    </ul>
  );
}

const Notification = ({ notification }: { notification: CompleteNotification }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{notification.component}</div>
      </div>
      <NotificationModal notification={notification} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No notifications
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new notification.
      </p>
      <div className="mt-6">
        <NotificationModal emptyState={true} />
      </div>
    </div>
  );
};

