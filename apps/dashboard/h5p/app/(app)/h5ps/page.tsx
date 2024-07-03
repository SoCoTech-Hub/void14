import H5pList from "@/components/h5ps/H5pList";
import NewH5pModal from "@/components/h5ps/H5pModal";
import { api } from "@/lib/trpc/api";

export default async function H5ps() {
  const { h5ps } = await api.h5ps.getH5ps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5ps</h1>
        <NewH5pModal />
      </div>
      <H5pList h5ps={h5ps} />
    </main>
  );
}
