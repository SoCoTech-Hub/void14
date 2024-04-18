import AdminPresetItAList from "@/components/adminPresetItAs/AdminPresetItAList";
import NewAdminPresetItAModal from "@/components/adminPresetItAs/AdminPresetItAModal";
import { api } from "@/lib/trpc/api";

export default async function AdminPresetItAs() {
  const { adminPresetItAs } = await api.adminPresetItAs.getAdminPresetItAs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Admin Preset It As</h1>
        <NewAdminPresetItAModal />
      </div>
      <AdminPresetItAList adminPresetItAs={adminPresetItAs} />
    </main>
  );
}
