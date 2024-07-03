import DistrictOrganizationList from "@/components/districtOrganizations/DistrictOrganizationList";
import NewDistrictOrganizationModal from "@/components/districtOrganizations/DistrictOrganizationModal";
import { api } from "@/lib/trpc/api";

export default async function DistrictOrganizations() {
  const { districtOrganizations } = await api.districtOrganizations.getDistrictOrganizations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">District Organizations</h1>
        <NewDistrictOrganizationModal />
      </div>
      <DistrictOrganizationList districtOrganizations={districtOrganizations} />
    </main>
  );
}
