"use client";
import { CompleteTagColl } from "@soco/tag-db/schema/tagColls";
import { trpc } from "@/lib/trpc/client";
import TagCollModal from "./TagCollModal";


export default function TagCollList({ tagColls }: { tagColls: CompleteTagColl[] }) {
  const { data: t } = trpc.tagColls.getTagColls.useQuery(undefined, {
    initialData: { tagColls },
    refetchOnMount: false,
  });

  if (t.tagColls.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.tagColls.map((tagColl) => (
        <TagColl tagColl={tagColl} key={tagColl.id} />
      ))}
    </ul>
  );
}

const TagColl = ({ tagColl }: { tagColl: CompleteTagColl }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{tagColl.component}</div>
      </div>
      <TagCollModal tagColl={tagColl} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tag colls
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tag coll.
      </p>
      <div className="mt-6">
        <TagCollModal emptyState={true} />
      </div>
    </div>
  );
};

