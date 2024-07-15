"use client";
import { CompleteMessageConversationMember } from "@soco/message-db/schema/messageConversationMembers";
import { trpc } from "@/lib/trpc/client";
import MessageConversationMemberModal from "./MessageConversationMemberModal";


export default function MessageConversationMemberList({ messageConversationMembers }: { messageConversationMembers: CompleteMessageConversationMember[] }) {
  const { data: m } = trpc.messageConversationMembers.getMessageConversationMembers.useQuery(undefined, {
    initialData: { messageConversationMembers },
    refetchOnMount: false,
  });

  if (m.messageConversationMembers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageConversationMembers.map((messageConversationMember) => (
        <MessageConversationMember messageConversationMember={messageConversationMember} key={messageConversationMember.id} />
      ))}
    </ul>
  );
}

const MessageConversationMember = ({ messageConversationMember }: { messageConversationMember: CompleteMessageConversationMember }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageConversationMember.conversationId}</div>
      </div>
      <MessageConversationMemberModal messageConversationMember={messageConversationMember} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message conversation members
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message conversation member.
      </p>
      <div className="mt-6">
        <MessageConversationMemberModal emptyState={true} />
      </div>
    </div>
  );
};

