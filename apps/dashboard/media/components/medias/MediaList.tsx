"use client";
import { CompleteMedia } from "@soco/media-db/schema/medias";
import { trpc } from "@/lib/trpc/client";
import MediaModal from "./MediaModal";


export default function MediaList({ medias }: { medias: CompleteMedia[] }) {
  const { data: m } = trpc.medias.getMedias.useQuery(undefined, {
    initialData: { medias },
    refetchOnMount: false,
  });

  if (m.medias.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.medias.map((media) => (
        <Media media={media} key={media.id} />
      ))}
    </ul>
  );
}

const Media = ({ media }: { media: CompleteMedia }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{media.name}</div>
      </div>
      <MediaModal media={media} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No medias
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new media.
      </p>
      <div className="mt-6">
        <MediaModal emptyState={true} />
      </div>
    </div>
  );
};

