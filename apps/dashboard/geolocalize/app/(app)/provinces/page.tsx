import ProvinceList from "@/components/provinces/ProvinceList";
import NewProvinceModal from "@/components/provinces/ProvinceModal";
import { api } from "@/lib/trpc/api";

export default async function Provinces() {
  const { provinces } = await api.provinces.getProvinces.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Provinces</h1>
        <NewProvinceModal />
      </div>
      <ProvinceList provinces={provinces} />
    </main>
  );
}
