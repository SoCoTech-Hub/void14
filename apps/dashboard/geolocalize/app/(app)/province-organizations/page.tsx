import ProvinceOrganizationList from "@/components/provinceOrganizations/ProvinceOrganizationList";
import NewProvinceOrganizationModal from "@/components/provinceOrganizations/ProvinceOrganizationModal";
import { api } from "@/lib/trpc/api";

export default async function ProvinceOrganizations() {
  const { provinceOrganizations } = await api.provinceOrganizations.getProvinceOrganizations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Province Organizations</h1>
        <NewProvinceOrganizationModal />
      </div>
      <ProvinceOrganizationList provinceOrganizations={provinceOrganizations} />
    </main>
  );
}
