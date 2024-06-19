"use client";
import { CompleteMessageConversationAction } from "@/lib/db/schema/messageConversationActions";
import { trpc } from "@/lib/trpc/client";
import MessageConversationActionModal from "./MessageConversationActionModal";


export default function MessageConversationActionList({ messageConversationActions }: { messageConversationActions: CompleteMessageConversationAction[] }) {
  const { data: m } = trpc.messageConversationActions.getMessageConversationActions.useQuery(undefined, {
    initialData: { messageConversationActions },
    refetchOnMount: false,
  });

  if (m.messageConversationActions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageConversationActions.map((messageConversationAction) => (
        <MessageConversationAction messageConversationAction={messageConversationAction} key={messageConversationAction.id} />
      ))}
    </ul>
  );
}

const MessageConversationAction = ({ messageConversationAction }: { messageConversationAction: CompleteMessageConversationAction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageConversationAction.action}</div>
      </div>
      <MessageConversationActionModal messageConversationAction={messageConversationAction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message conversation actions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message conversation action.
      </p>
      <div className="mt-6">
        <MessageConversationActionModal emptyState={true} />
      </div>
    </div>
  );
};

