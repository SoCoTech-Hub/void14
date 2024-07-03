import DistrictList from "@/components/districts/DistrictList";
import NewDistrictModal from "@/components/districts/DistrictModal";
import { api } from "@/lib/trpc/api";

export default async function Districts() {
  const { districts } = await api.districts.getDistricts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Districts</h1>
        <NewDistrictModal />
      </div>
      <DistrictList districts={districts} />
    </main>
  );
}
