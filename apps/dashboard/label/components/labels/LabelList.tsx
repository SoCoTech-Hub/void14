"use client";
import { CompleteLabel } from "@soco/label-db/schema/labels";
import { trpc } from "@/lib/trpc/client";
import LabelModal from "./LabelModal";


export default function LabelList({ labels }: { labels: CompleteLabel[] }) {
  const { data: l } = trpc.labels.getLabels.useQuery(undefined, {
    initialData: { labels },
    refetchOnMount: false,
  });

  if (l.labels.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.labels.map((label) => (
        <Label label={label} key={label.id} />
      ))}
    </ul>
  );
}

const Label = ({ label }: { label: CompleteLabel }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{label.course}</div>
      </div>
      <LabelModal label={label} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No labels
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new label.
      </p>
      <div className="mt-6">
        <LabelModal emptyState={true} />
      </div>
    </div>
  );
};

