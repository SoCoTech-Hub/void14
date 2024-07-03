"use client";
import { CompleteForumDigest } from "@/lib/db/schema/forumDigests";
import { trpc } from "@/lib/trpc/client";
import ForumDigestModal from "./ForumDigestModal";


export default function ForumDigestList({ forumDigests }: { forumDigests: CompleteForumDigest[] }) {
  const { data: f } = trpc.forumDigests.getForumDigests.useQuery(undefined, {
    initialData: { forumDigests },
    refetchOnMount: false,
  });

  if (f.forumDigests.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumDigests.map((forumDigest) => (
        <ForumDigest forumDigest={forumDigest} key={forumDigest.id} />
      ))}
    </ul>
  );
}

const ForumDigest = ({ forumDigest }: { forumDigest: CompleteForumDigest }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumDigest.forum}</div>
      </div>
      <ForumDigestModal forumDigest={forumDigest} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum digests
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum digest.
      </p>
      <div className="mt-6">
        <ForumDigestModal emptyState={true} />
      </div>
    </div>
  );
};

