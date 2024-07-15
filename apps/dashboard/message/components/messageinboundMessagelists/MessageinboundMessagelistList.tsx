"use client";
import { CompleteMessageinboundMessagelist } from "@soco/message-db/schema/messageinboundMessagelists";
import { trpc } from "@/lib/trpc/client";
import MessageinboundMessagelistModal from "./MessageinboundMessagelistModal";


export default function MessageinboundMessagelistList({ messageinboundMessagelists }: { messageinboundMessagelists: CompleteMessageinboundMessagelist[] }) {
  const { data: m } = trpc.messageinboundMessagelists.getMessageinboundMessagelists.useQuery(undefined, {
    initialData: { messageinboundMessagelists },
    refetchOnMount: false,
  });

  if (m.messageinboundMessagelists.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageinboundMessagelists.map((messageinboundMessagelist) => (
        <MessageinboundMessagelist messageinboundMessagelist={messageinboundMessagelist} key={messageinboundMessagelist.id} />
      ))}
    </ul>
  );
}

const MessageinboundMessagelist = ({ messageinboundMessagelist }: { messageinboundMessagelist: CompleteMessageinboundMessagelist }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageinboundMessagelist.address}</div>
      </div>
      <MessageinboundMessagelistModal messageinboundMessagelist={messageinboundMessagelist} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No messageinbound messagelists
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new messageinbound messagelist.
      </p>
      <div className="mt-6">
        <MessageinboundMessagelistModal emptyState={true} />
      </div>
    </div>
  );
};

