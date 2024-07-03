"use client";
import { CompleteForumTrackPref } from "@/lib/db/schema/forumTrackPrefs";
import { trpc } from "@/lib/trpc/client";
import ForumTrackPrefModal from "./ForumTrackPrefModal";


export default function ForumTrackPrefList({ forumTrackPrefs }: { forumTrackPrefs: CompleteForumTrackPref[] }) {
  const { data: f } = trpc.forumTrackPrefs.getForumTrackPrefs.useQuery(undefined, {
    initialData: { forumTrackPrefs },
    refetchOnMount: false,
  });

  if (f.forumTrackPrefs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumTrackPrefs.map((forumTrackPref) => (
        <ForumTrackPref forumTrackPref={forumTrackPref} key={forumTrackPref.forumTrackPref.id} />
      ))}
    </ul>
  );
}

const ForumTrackPref = ({ forumTrackPref }: { forumTrackPref: CompleteForumTrackPref }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumTrackPref.forumTrackPref.forumId}</div>
      </div>
      <ForumTrackPrefModal forumTrackPref={forumTrackPref.forumTrackPref} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum track prefs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum track pref.
      </p>
      <div className="mt-6">
        <ForumTrackPrefModal emptyState={true} />
      </div>
    </div>
  );
};

