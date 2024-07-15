"use client";
import { CompleteSocialReaction } from "@soco/blog-db/schema/socialReactions";
import { trpc } from "@/lib/trpc/client";
import SocialReactionModal from "./SocialReactionModal";


export default function SocialReactionList({ socialReactions }: { socialReactions: CompleteSocialReaction[] }) {
  const { data: s } = trpc.socialReactions.getSocialReactions.useQuery(undefined, {
    initialData: { socialReactions },
    refetchOnMount: false,
  });

  if (s.socialReactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.socialReactions.map((socialReaction) => (
        <SocialReaction socialReaction={socialReaction} key={socialReaction.socialReaction.id} />
      ))}
    </ul>
  );
}

const SocialReaction = ({ socialReaction }: { socialReaction: CompleteSocialReaction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{socialReaction.socialReaction.blogId}</div>
      </div>
      <SocialReactionModal socialReaction={socialReaction.socialReaction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No social reactions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new social reaction.
      </p>
      <div className="mt-6">
        <SocialReactionModal emptyState={true} />
      </div>
    </div>
  );
};

