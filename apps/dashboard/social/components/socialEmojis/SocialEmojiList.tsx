"use client";
import { CompleteSocialEmoji } from "@soco/social-db/schema/socialEmojis";
import { trpc } from "@/lib/trpc/client";
import SocialEmojiModal from "./SocialEmojiModal";


export default function SocialEmojiList({ socialEmojis }: { socialEmojis: CompleteSocialEmoji[] }) {
  const { data: s } = trpc.socialEmojis.getSocialEmojis.useQuery(undefined, {
    initialData: { socialEmojis },
    refetchOnMount: false,
  });

  if (s.socialEmojis.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.socialEmojis.map((socialEmoji) => (
        <SocialEmoji socialEmoji={socialEmoji} key={socialEmoji.id} />
      ))}
    </ul>
  );
}

const SocialEmoji = ({ socialEmoji }: { socialEmoji: CompleteSocialEmoji }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{socialEmoji.name}</div>
      </div>
      <SocialEmojiModal socialEmoji={socialEmoji} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No social emojis
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new social emoji.
      </p>
      <div className="mt-6">
        <SocialEmojiModal emptyState={true} />
      </div>
    </div>
  );
};

