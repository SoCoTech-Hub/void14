import H5pLibraryDependencyList from "@/components/h5pLibraryDependencies/H5pLibraryDependencyList";
import NewH5pLibraryDependencyModal from "@/components/h5pLibraryDependencies/H5pLibraryDependencyModal";
import { api } from "@/lib/trpc/api";

export default async function H5pLibraryDependencies() {
  const { h5pLibraryDependencies } = await api.h5pLibraryDependencies.getH5pLibraryDependencies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5p Library Dependencies</h1>
        <NewH5pLibraryDependencyModal />
      </div>
      <H5pLibraryDependencyList h5pLibraryDependencies={h5pLibraryDependencies} />
    </main>
  );
}
