"use client";
import { CompleteForum } from "@/lib/db/schema/forums";
import { trpc } from "@/lib/trpc/client";
import ForumModal from "./ForumModal";


export default function ForumList({ forums }: { forums: CompleteForum[] }) {
  const { data: f } = trpc.forums.getForums.useQuery(undefined, {
    initialData: { forums },
    refetchOnMount: false,
  });

  if (f.forums.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forums.map((forum) => (
        <Forum forum={forum} key={forum.id} />
      ))}
    </ul>
  );
}

const Forum = ({ forum }: { forum: CompleteForum }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forum.name}</div>
      </div>
      <ForumModal forum={forum} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forums
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum.
      </p>
      <div className="mt-6">
        <ForumModal emptyState={true} />
      </div>
    </div>
  );
};

