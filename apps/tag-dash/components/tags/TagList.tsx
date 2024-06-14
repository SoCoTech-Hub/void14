"use client";
import { CompleteTag } from "@/lib/db/schema/tags";
import { trpc } from "@/lib/trpc/client";
import TagModal from "./TagModal";


export default function TagList({ tags }: { tags: CompleteTag[] }) {
  const { data: t } = trpc.tags.getTags.useQuery(undefined, {
    initialData: { tags },
    refetchOnMount: false,
  });

  if (t.tags.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.tags.map((tag) => (
        <Tag tag={tag} key={tag.tag.id} />
      ))}
    </ul>
  );
}

const Tag = ({ tag }: { tag: CompleteTag }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{tag.tag.description}</div>
      </div>
      <TagModal tag={tag.tag} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tags
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tag.
      </p>
      <div className="mt-6">
        <TagModal emptyState={true} />
      </div>
    </div>
  );
};

