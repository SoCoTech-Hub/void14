import AdminPresetAppPlugList from "@/components/adminPresetAppPlugs/AdminPresetAppPlugList";
import NewAdminPresetAppPlugModal from "@/components/adminPresetAppPlugs/AdminPresetAppPlugModal";
import { api } from "@/lib/trpc/api";

export default async function AdminPresetAppPlugs() {
  const { adminPresetAppPlugs } = await api.adminPresetAppPlugs.getAdminPresetAppPlugs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Admin Preset App Plugs</h1>
        <NewAdminPresetAppPlugModal />
      </div>
      <AdminPresetAppPlugList adminPresetAppPlugs={adminPresetAppPlugs} />
    </main>
  );
}
