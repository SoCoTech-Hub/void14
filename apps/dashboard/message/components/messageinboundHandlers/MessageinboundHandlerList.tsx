"use client";
import { CompleteMessageinboundHandler } from "@/lib/db/schema/messageinboundHandlers";
import { trpc } from "@/lib/trpc/client";
import MessageinboundHandlerModal from "./MessageinboundHandlerModal";


export default function MessageinboundHandlerList({ messageinboundHandlers }: { messageinboundHandlers: CompleteMessageinboundHandler[] }) {
  const { data: m } = trpc.messageinboundHandlers.getMessageinboundHandlers.useQuery(undefined, {
    initialData: { messageinboundHandlers },
    refetchOnMount: false,
  });

  if (m.messageinboundHandlers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageinboundHandlers.map((messageinboundHandler) => (
        <MessageinboundHandler messageinboundHandler={messageinboundHandler} key={messageinboundHandler.id} />
      ))}
    </ul>
  );
}

const MessageinboundHandler = ({ messageinboundHandler }: { messageinboundHandler: CompleteMessageinboundHandler }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageinboundHandler.className}</div>
      </div>
      <MessageinboundHandlerModal messageinboundHandler={messageinboundHandler} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No messageinbound handlers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new messageinbound handler.
      </p>
      <div className="mt-6">
        <MessageinboundHandlerModal emptyState={true} />
      </div>
    </div>
  );
};

