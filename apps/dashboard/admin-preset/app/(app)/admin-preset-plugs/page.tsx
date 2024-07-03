import AdminPresetPlugList from "@/components/adminPresetPlugs/AdminPresetPlugList";
import NewAdminPresetPlugModal from "@/components/adminPresetPlugs/AdminPresetPlugModal";
import { api } from "@/lib/trpc/api";

export default async function AdminPresetPlugs() {
  const { adminPresetPlugs } = await api.adminPresetPlugs.getAdminPresetPlugs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Admin Preset Plugs</h1>
        <NewAdminPresetPlugModal />
      </div>
      <AdminPresetPlugList adminPresetPlugs={adminPresetPlugs} />
    </main>
  );
}
