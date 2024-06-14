import StickerList from "@/components/stickers/StickerList";
import NewStickerModal from "@/components/stickers/StickerModal";
import { api } from "@/lib/trpc/api";

export default async function Stickers() {
  const { stickers } = await api.stickers.getStickers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Stickers</h1>
        <NewStickerModal />
      </div>
      <StickerList stickers={stickers} />
    </main>
  );
}
