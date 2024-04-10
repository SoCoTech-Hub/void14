"use client";
import { CompleteSocialIcon } from "@/lib/db/schema/socialIcons";
import { trpc } from "@/lib/trpc/client";
import SocialIconModal from "./SocialIconModal";


export default function SocialIconList({ socialIcons }: { socialIcons: CompleteSocialIcon[] }) {
  const { data: s } = trpc.socialIcons.getSocialIcons.useQuery(undefined, {
    initialData: { socialIcons },
    refetchOnMount: false,
  });

  if (s.socialIcons.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.socialIcons.map((socialIcon) => (
        <SocialIcon socialIcon={socialIcon} key={socialIcon.id} />
      ))}
    </ul>
  );
}

const SocialIcon = ({ socialIcon }: { socialIcon: CompleteSocialIcon }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{socialIcon.emoji}</div>
      </div>
      <SocialIconModal socialIcon={socialIcon} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No social icons
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new social icon.
      </p>
      <div className="mt-6">
        <SocialIconModal emptyState={true} />
      </div>
    </div>
  );
};

