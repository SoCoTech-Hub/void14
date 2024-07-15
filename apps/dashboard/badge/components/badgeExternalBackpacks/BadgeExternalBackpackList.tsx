"use client";
import { CompleteBadgeExternalBackpack } from "@soco/badge-db/schema/badgeExternalBackpacks";
import { trpc } from "@/lib/trpc/client";
import BadgeExternalBackpackModal from "./BadgeExternalBackpackModal";


export default function BadgeExternalBackpackList({ badgeExternalBackpacks }: { badgeExternalBackpacks: CompleteBadgeExternalBackpack[] }) {
  const { data: b } = trpc.badgeExternalBackpacks.getBadgeExternalBackpacks.useQuery(undefined, {
    initialData: { badgeExternalBackpacks },
    refetchOnMount: false,
  });

  if (b.badgeExternalBackpacks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.badgeExternalBackpacks.map((badgeExternalBackpack) => (
        <BadgeExternalBackpack badgeExternalBackpack={badgeExternalBackpack} key={badgeExternalBackpack.id} />
      ))}
    </ul>
  );
}

const BadgeExternalBackpack = ({ badgeExternalBackpack }: { badgeExternalBackpack: CompleteBadgeExternalBackpack }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{badgeExternalBackpack.apiVersion}</div>
      </div>
      <BadgeExternalBackpackModal badgeExternalBackpack={badgeExternalBackpack} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No badge external backpacks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new badge external backpack.
      </p>
      <div className="mt-6">
        <BadgeExternalBackpackModal emptyState={true} />
      </div>
    </div>
  );
};

