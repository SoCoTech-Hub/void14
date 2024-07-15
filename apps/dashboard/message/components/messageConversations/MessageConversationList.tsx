"use client";
import { CompleteMessageConversation } from "@soco/message-db/schema/messageConversations";
import { trpc } from "@/lib/trpc/client";
import MessageConversationModal from "./MessageConversationModal";


export default function MessageConversationList({ messageConversations }: { messageConversations: CompleteMessageConversation[] }) {
  const { data: m } = trpc.messageConversations.getMessageConversations.useQuery(undefined, {
    initialData: { messageConversations },
    refetchOnMount: false,
  });

  if (m.messageConversations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageConversations.map((messageConversation) => (
        <MessageConversation messageConversation={messageConversation} key={messageConversation.id} />
      ))}
    </ul>
  );
}

const MessageConversation = ({ messageConversation }: { messageConversation: CompleteMessageConversation }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageConversation.component}</div>
      </div>
      <MessageConversationModal messageConversation={messageConversation} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message conversations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message conversation.
      </p>
      <div className="mt-6">
        <MessageConversationModal emptyState={true} />
      </div>
    </div>
  );
};

