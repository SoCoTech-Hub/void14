"use client";
import { CompleteMessageUserAction } from "@/lib/db/schema/messageUserActions";
import { trpc } from "@/lib/trpc/client";
import MessageUserActionModal from "./MessageUserActionModal";


export default function MessageUserActionList({ messageUserActions }: { messageUserActions: CompleteMessageUserAction[] }) {
  const { data: m } = trpc.messageUserActions.getMessageUserActions.useQuery(undefined, {
    initialData: { messageUserActions },
    refetchOnMount: false,
  });

  if (m.messageUserActions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageUserActions.map((messageUserAction) => (
        <MessageUserAction messageUserAction={messageUserAction} key={messageUserAction.id} />
      ))}
    </ul>
  );
}

const MessageUserAction = ({ messageUserAction }: { messageUserAction: CompleteMessageUserAction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageUserAction.action}</div>
      </div>
      <MessageUserActionModal messageUserAction={messageUserAction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message user actions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message user action.
      </p>
      <div className="mt-6">
        <MessageUserActionModal emptyState={true} />
      </div>
    </div>
  );
};

