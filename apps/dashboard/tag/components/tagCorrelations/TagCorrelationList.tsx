"use client";
import { CompleteTagCorrelation } from "@soco/tag-db/schema/tagCorrelations";
import { trpc } from "@/lib/trpc/client";
import TagCorrelationModal from "./TagCorrelationModal";


export default function TagCorrelationList({ tagCorrelations }: { tagCorrelations: CompleteTagCorrelation[] }) {
  const { data: t } = trpc.tagCorrelations.getTagCorrelations.useQuery(undefined, {
    initialData: { tagCorrelations },
    refetchOnMount: false,
  });

  if (t.tagCorrelations.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.tagCorrelations.map((tagCorrelation) => (
        <TagCorrelation tagCorrelation={tagCorrelation} key={tagCorrelation.tagCorrelation.id} />
      ))}
    </ul>
  );
}

const TagCorrelation = ({ tagCorrelation }: { tagCorrelation: CompleteTagCorrelation }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{tagCorrelation.tagCorrelation.correlatedTags}</div>
      </div>
      <TagCorrelationModal tagCorrelation={tagCorrelation.tagCorrelation} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tag correlations
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tag correlation.
      </p>
      <div className="mt-6">
        <TagCorrelationModal emptyState={true} />
      </div>
    </div>
  );
};

