"use client";
import { CompleteTagInstance } from "@soco/tag-db/schema/tagInstances";
import { trpc } from "@/lib/trpc/client";
import TagInstanceModal from "./TagInstanceModal";


export default function TagInstanceList({ tagInstances }: { tagInstances: CompleteTagInstance[] }) {
  const { data: t } = trpc.tagInstances.getTagInstances.useQuery(undefined, {
    initialData: { tagInstances },
    refetchOnMount: false,
  });

  if (t.tagInstances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.tagInstances.map((tagInstance) => (
        <TagInstance tagInstance={tagInstance} key={tagInstance.tagInstance.id} />
      ))}
    </ul>
  );
}

const TagInstance = ({ tagInstance }: { tagInstance: CompleteTagInstance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{tagInstance.tagInstance.component}</div>
      </div>
      <TagInstanceModal tagInstance={tagInstance.tagInstance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tag instances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tag instance.
      </p>
      <div className="mt-6">
        <TagInstanceModal emptyState={true} />
      </div>
    </div>
  );
};

