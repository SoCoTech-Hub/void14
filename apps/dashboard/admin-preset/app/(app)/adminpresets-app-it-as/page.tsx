import AdminpresetsAppItAList from "@/components/adminpresetsAppItAs/AdminpresetsAppItAList";
import NewAdminpresetsAppItAModal from "@/components/adminpresetsAppItAs/AdminpresetsAppItAModal";
import { api } from "@/lib/trpc/api";

export default async function AdminpresetsAppItAs() {
  const { adminpresetsAppItAs } = await api.adminpresetsAppItAs.getAdminpresetsAppItAs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Adminpresets App It As</h1>
        <NewAdminpresetsAppItAModal />
      </div>
      <AdminpresetsAppItAList adminpresetsAppItAs={adminpresetsAppItAs} />
    </main>
  );
}
