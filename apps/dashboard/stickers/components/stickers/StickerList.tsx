"use client";
import { CompleteSticker } from "@/lib/db/schema/stickers";
import { trpc } from "@/lib/trpc/client";
import StickerModal from "./StickerModal";


export default function StickerList({ stickers }: { stickers: CompleteSticker[] }) {
  const { data: s } = trpc.stickers.getStickers.useQuery(undefined, {
    initialData: { stickers },
    refetchOnMount: false,
  });

  if (s.stickers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.stickers.map((sticker) => (
        <Sticker sticker={sticker} key={sticker.id} />
      ))}
    </ul>
  );
}

const Sticker = ({ sticker }: { sticker: CompleteSticker }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{sticker.name}</div>
      </div>
      <StickerModal sticker={sticker} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stickers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new sticker.
      </p>
      <div className="mt-6">
        <StickerModal emptyState={true} />
      </div>
    </div>
  );
};

