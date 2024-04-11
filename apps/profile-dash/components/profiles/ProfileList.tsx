"use client";
import { CompleteProfile } from "@/lib/db/schema/profiles";
import { trpc } from "@/lib/trpc/client";
import ProfileModal from "./ProfileModal";


export default function ProfileList({ profiles }: { profiles: CompleteProfile[] }) {
  const { data: p } = trpc.profiles.getProfiles.useQuery(undefined, {
    initialData: { profiles },
    refetchOnMount: false,
  });

  if (p.profiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.profiles.map((profile) => (
        <Profile profile={profile} key={profile.id} />
      ))}
    </ul>
  );
}

const Profile = ({ profile }: { profile: CompleteProfile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{profile.name}</div>
      </div>
      <ProfileModal profile={profile} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No profiles
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new profile.
      </p>
      <div className="mt-6">
        <ProfileModal emptyState={true} />
      </div>
    </div>
  );
};

