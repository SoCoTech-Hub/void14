"use client";
import { CompleteSocialShare } from "@soco/social-db/schema/socialShares";
import { trpc } from "@/lib/trpc/client";
import SocialShareModal from "./SocialShareModal";


export default function SocialShareList({ socialShares }: { socialShares: CompleteSocialShare[] }) {
  const { data: s } = trpc.socialShares.getSocialShares.useQuery(undefined, {
    initialData: { socialShares },
    refetchOnMount: false,
  });

  if (s.socialShares.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.socialShares.map((socialShare) => (
        <SocialShare socialShare={socialShare} key={socialShare.id} />
      ))}
    </ul>
  );
}

const SocialShare = ({ socialShare }: { socialShare: CompleteSocialShare }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{socialShare.fieldId}</div>
      </div>
      <SocialShareModal socialShare={socialShare} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No social shares
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new social share.
      </p>
      <div className="mt-6">
        <SocialShareModal emptyState={true} />
      </div>
    </div>
  );
};

