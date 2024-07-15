"use client";
import { CompleteBadgeBackpackOauth2 } from "@soco/badge-db/schema/badgeBackpackOauth2s";
import { trpc } from "@/lib/trpc/client";
import BadgeBackpackOauth2Modal from "./BadgeBackpackOauth2Modal";


export default function BadgeBackpackOauth2List({ badgeBackpackOauth2s }: { badgeBackpackOauth2s: CompleteBadgeBackpackOauth2[] }) {
  const { data: b } = trpc.badgeBackpackOauth2s.getBadgeBackpackOauth2s.useQuery(undefined, {
    initialData: { badgeBackpackOauth2s },
    refetchOnMount: false,
  });

  if (b.badgeBackpackOauth2s.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.badgeBackpackOauth2s.map((badgeBackpackOauth2) => (
        <BadgeBackpackOauth2 badgeBackpackOauth2={badgeBackpackOauth2} key={badgeBackpackOauth2.id} />
      ))}
    </ul>
  );
}

const BadgeBackpackOauth2 = ({ badgeBackpackOauth2 }: { badgeBackpackOauth2: CompleteBadgeBackpackOauth2 }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{badgeBackpackOauth2.expires}</div>
      </div>
      <BadgeBackpackOauth2Modal badgeBackpackOauth2={badgeBackpackOauth2} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No badge backpack oauth2s
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new badge backpack oauth2.
      </p>
      <div className="mt-6">
        <BadgeBackpackOauth2Modal emptyState={true} />
      </div>
    </div>
  );
};

