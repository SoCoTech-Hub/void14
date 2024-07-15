"use client";
import { CompleteNotificationResponse } from "@soco/notification-db/schema/notificationResponses";
import { trpc } from "@/lib/trpc/client";
import NotificationResponseModal from "./NotificationResponseModal";


export default function NotificationResponseList({ notificationResponses }: { notificationResponses: CompleteNotificationResponse[] }) {
  const { data: n } = trpc.notificationResponses.getNotificationResponses.useQuery(undefined, {
    initialData: { notificationResponses },
    refetchOnMount: false,
  });

  if (n.notificationResponses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {n.notificationResponses.map((notificationResponse) => (
        <NotificationResponse notificationResponse={notificationResponse} key={notificationResponse.id} />
      ))}
    </ul>
  );
}

const NotificationResponse = ({ notificationResponse }: { notificationResponse: CompleteNotificationResponse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full flex flex-row gap-x-2">
        <div>{notificationResponse.userId}</div>
        <div>{notificationResponse.notification?.name}</div>
      </div>
      <NotificationResponseModal notificationResponse={notificationResponse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No notification responses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new notification response.
      </p>
      <div className="mt-6">
        <NotificationResponseModal emptyState={true} />
      </div>
    </div>
  );
};

