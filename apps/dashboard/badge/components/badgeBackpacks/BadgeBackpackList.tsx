"use client";
import { CompleteBadgeBackpack } from "@soco/badge-db/schema/badgeBackpacks";
import { trpc } from "@/lib/trpc/client";
import BadgeBackpackModal from "./BadgeBackpackModal";


export default function BadgeBackpackList({ badgeBackpacks }: { badgeBackpacks: CompleteBadgeBackpack[] }) {
  const { data: b } = trpc.badgeBackpacks.getBadgeBackpacks.useQuery(undefined, {
    initialData: { badgeBackpacks },
    refetchOnMount: false,
  });

  if (b.badgeBackpacks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.badgeBackpacks.map((badgeBackpack) => (
        <BadgeBackpack badgeBackpack={badgeBackpack} key={badgeBackpack.id} />
      ))}
    </ul>
  );
}

const BadgeBackpack = ({ badgeBackpack }: { badgeBackpack: CompleteBadgeBackpack }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{badgeBackpack.autoSync}</div>
      </div>
      <BadgeBackpackModal badgeBackpack={badgeBackpack} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No badge backpacks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new badge backpack.
      </p>
      <div className="mt-6">
        <BadgeBackpackModal emptyState={true} />
      </div>
    </div>
  );
};

