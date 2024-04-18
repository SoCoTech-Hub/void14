import OrganizationList from "@/components/organizations/OrganizationList";
import NewOrganizationModal from "@/components/organizations/OrganizationModal";
import { api } from "@/lib/trpc/api";

export default async function Organizations() {
  const { organizations } = await api.organizations.getOrganizations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Organizations</h1>
        <NewOrganizationModal />
      </div>
      <OrganizationList organizations={organizations} />
    </main>
  );
}
