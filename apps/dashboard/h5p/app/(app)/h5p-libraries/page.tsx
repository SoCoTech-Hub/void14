import H5pLibraryList from "@/components/h5pLibraries/H5pLibraryList";
import NewH5pLibraryModal from "@/components/h5pLibraries/H5pLibraryModal";
import { api } from "@/lib/trpc/api";

export default async function H5pLibraries() {
  const { h5pLibraries } = await api.h5pLibraries.getH5pLibraries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5p Libraries</h1>
        <NewH5pLibraryModal />
      </div>
      <H5pLibraryList h5pLibraries={h5pLibraries} />
    </main>
  );
}
