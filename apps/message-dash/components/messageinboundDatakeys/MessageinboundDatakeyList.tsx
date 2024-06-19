"use client";
import { CompleteMessageinboundDatakey } from "@/lib/db/schema/messageinboundDatakeys";
import { trpc } from "@/lib/trpc/client";
import MessageinboundDatakeyModal from "./MessageinboundDatakeyModal";


export default function MessageinboundDatakeyList({ messageinboundDatakeys }: { messageinboundDatakeys: CompleteMessageinboundDatakey[] }) {
  const { data: m } = trpc.messageinboundDatakeys.getMessageinboundDatakeys.useQuery(undefined, {
    initialData: { messageinboundDatakeys },
    refetchOnMount: false,
  });

  if (m.messageinboundDatakeys.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageinboundDatakeys.map((messageinboundDatakey) => (
        <MessageinboundDatakey messageinboundDatakey={messageinboundDatakey} key={messageinboundDatakey.id} />
      ))}
    </ul>
  );
}

const MessageinboundDatakey = ({ messageinboundDatakey }: { messageinboundDatakey: CompleteMessageinboundDatakey }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageinboundDatakey.dataKey}</div>
      </div>
      <MessageinboundDatakeyModal messageinboundDatakey={messageinboundDatakey} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No messageinbound datakeys
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new messageinbound datakey.
      </p>
      <div className="mt-6">
        <MessageinboundDatakeyModal emptyState={true} />
      </div>
    </div>
  );
};

