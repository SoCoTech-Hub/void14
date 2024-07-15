"use client";
import { CompleteSocialLink } from "@soco/social-db/schema/socialLinks";
import { trpc } from "@/lib/trpc/client";
import SocialLinkModal from "./SocialLinkModal";


export default function SocialLinkList({ socialLinks }: { socialLinks: CompleteSocialLink[] }) {
  const { data: s } = trpc.socialLinks.getSocialLinks.useQuery(undefined, {
    initialData: { socialLinks },
    refetchOnMount: false,
  });

  if (s.socialLinks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.socialLinks.map((socialLink) => (
        <SocialLink socialLink={socialLink} key={socialLink.id} />
      ))}
    </ul>
  );
}

const SocialLink = ({ socialLink }: { socialLink: CompleteSocialLink }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{socialLink.name}</div>
      </div>
      <SocialLinkModal socialLink={socialLink} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No social links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new social link.
      </p>
      <div className="mt-6">
        <SocialLinkModal emptyState={true} />
      </div>
    </div>
  );
};

