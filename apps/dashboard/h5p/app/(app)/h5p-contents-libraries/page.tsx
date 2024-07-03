import H5pContentsLibraryList from "@/components/h5pContentsLibraries/H5pContentsLibraryList";
import NewH5pContentsLibraryModal from "@/components/h5pContentsLibraries/H5pContentsLibraryModal";
import { api } from "@/lib/trpc/api";

export default async function H5pContentsLibraries() {
  const { h5pContentsLibraries } = await api.h5pContentsLibraries.getH5pContentsLibraries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5p Contents Libraries</h1>
        <NewH5pContentsLibraryModal />
      </div>
      <H5pContentsLibraryList h5pContentsLibraries={h5pContentsLibraries} />
    </main>
  );
}
