import H5pLibrariesCachedassetList from "@/components/h5pLibrariesCachedassets/H5pLibrariesCachedassetList";
import NewH5pLibrariesCachedassetModal from "@/components/h5pLibrariesCachedassets/H5pLibrariesCachedassetModal";
import { api } from "@/lib/trpc/api";

export default async function H5pLibrariesCachedassets() {
  const { h5pLibrariesCachedassets } = await api.h5pLibrariesCachedassets.getH5pLibrariesCachedassets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5p Libraries Cachedassets</h1>
        <NewH5pLibrariesCachedassetModal />
      </div>
      <H5pLibrariesCachedassetList h5pLibrariesCachedassets={h5pLibrariesCachedassets} />
    </main>
  );
}
