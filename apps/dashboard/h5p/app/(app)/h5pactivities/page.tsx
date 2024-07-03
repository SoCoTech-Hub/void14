import H5pactivityList from "@/components/h5pactivities/H5pactivityList";
import NewH5pactivityModal from "@/components/h5pactivities/H5pactivityModal";
import { api } from "@/lib/trpc/api";

export default async function H5pactivities() {
  const { h5pactivities } = await api.h5pactivities.getH5pactivities.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5pactivities</h1>
        <NewH5pactivityModal />
      </div>
      <H5pactivityList h5pactivities={h5pactivities} />
    </main>
  );
}
