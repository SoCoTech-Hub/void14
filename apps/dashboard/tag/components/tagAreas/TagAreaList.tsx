"use client";
import { CompleteTagArea } from "@/lib/db/schema/tagAreas";
import { trpc } from "@/lib/trpc/client";
import TagAreaModal from "./TagAreaModal";


export default function TagAreaList({ tagAreas }: { tagAreas: CompleteTagArea[] }) {
  const { data: t } = trpc.tagAreas.getTagAreas.useQuery(undefined, {
    initialData: { tagAreas },
    refetchOnMount: false,
  });

  if (t.tagAreas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.tagAreas.map((tagArea) => (
        <TagArea tagArea={tagArea} key={tagArea.tagArea.id} />
      ))}
    </ul>
  );
}

const TagArea = ({ tagArea }: { tagArea: CompleteTagArea }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{tagArea.tagArea.callback}</div>
      </div>
      <TagAreaModal tagArea={tagArea.tagArea} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tag areas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tag area.
      </p>
      <div className="mt-6">
        <TagAreaModal emptyState={true} />
      </div>
    </div>
  );
};

