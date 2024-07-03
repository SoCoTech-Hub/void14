"use client";
import { CompleteChat } from "@/lib/db/schema/chats";
import { trpc } from "@/lib/trpc/client";
import ChatModal from "./ChatModal";


export default function ChatList({ chats }: { chats: CompleteChat[] }) {
  const { data: c } = trpc.chats.getChats.useQuery(undefined, {
    initialData: { chats },
    refetchOnMount: false,
  });

  if (c.chats.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.chats.map((chat) => (
        <Chat chat={chat} key={chat.id} />
      ))}
    </ul>
  );
}

const Chat = ({ chat }: { chat: CompleteChat }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{chat.chatTime}</div>
      </div>
      <ChatModal chat={chat} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No chats
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new chat.
      </p>
      <div className="mt-6">
        <ChatModal emptyState={true} />
      </div>
    </div>
  );
};

