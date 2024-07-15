"use client";
import { CompleteChatUser } from "@soco/chat-db/schema/chatUsers";
import { trpc } from "@/lib/trpc/client";
import ChatUserModal from "./ChatUserModal";


export default function ChatUserList({ chatUsers }: { chatUsers: CompleteChatUser[] }) {
  const { data: c } = trpc.chatUsers.getChatUsers.useQuery(undefined, {
    initialData: { chatUsers },
    refetchOnMount: false,
  });

  if (c.chatUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.chatUsers.map((chatUser) => (
        <ChatUser chatUser={chatUser} key={chatUser.chatUser.id} />
      ))}
    </ul>
  );
}

const ChatUser = ({ chatUser }: { chatUser: CompleteChatUser }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{chatUser.chatUser.chatId}</div>
      </div>
      <ChatUserModal chatUser={chatUser.chatUser} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No chat users
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new chat user.
      </p>
      <div className="mt-6">
        <ChatUserModal emptyState={true} />
      </div>
    </div>
  );
};

