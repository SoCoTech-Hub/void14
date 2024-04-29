"use client";
import { CompleteChatMessagesCurrent } from "@/lib/db/schema/chatMessagesCurrents";
import { trpc } from "@/lib/trpc/client";
import ChatMessagesCurrentModal from "./ChatMessagesCurrentModal";


export default function ChatMessagesCurrentList({ chatMessagesCurrents }: { chatMessagesCurrents: CompleteChatMessagesCurrent[] }) {
  const { data: c } = trpc.chatMessagesCurrents.getChatMessagesCurrents.useQuery(undefined, {
    initialData: { chatMessagesCurrents },
    refetchOnMount: false,
  });

  if (c.chatMessagesCurrents.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.chatMessagesCurrents.map((chatMessagesCurrent) => (
        <ChatMessagesCurrent chatMessagesCurrent={chatMessagesCurrent} key={chatMessagesCurrent.chatMessagesCurrent.id} />
      ))}
    </ul>
  );
}

const ChatMessagesCurrent = ({ chatMessagesCurrent }: { chatMessagesCurrent: CompleteChatMessagesCurrent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{chatMessagesCurrent.chatMessagesCurrent.chatId}</div>
      </div>
      <ChatMessagesCurrentModal chatMessagesCurrent={chatMessagesCurrent.chatMessagesCurrent} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No chat messages currents
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new chat messages current.
      </p>
      <div className="mt-6">
        <ChatMessagesCurrentModal emptyState={true} />
      </div>
    </div>
  );
};

