"use client";
import { CompleteSocial } from "@/lib/db/schema/socials";
import { trpc } from "@/lib/trpc/client";
import SocialModal from "./SocialModal";


export default function SocialList({ socials }: { socials: CompleteSocial[] }) {
  const { data: s } = trpc.socials.getSocials.useQuery(undefined, {
    initialData: { socials },
    refetchOnMount: false,
  });

  if (s.socials.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.socials.map((social) => (
        <Social social={social} key={social.id} />
      ))}
    </ul>
  );
}

const Social = ({ social }: { social: CompleteSocial }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{social.tableName}</div>
      </div>
      <SocialModal social={social} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No socials
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new social.
      </p>
      <div className="mt-6">
        <SocialModal emptyState={true} />
      </div>
    </div>
  );
};

