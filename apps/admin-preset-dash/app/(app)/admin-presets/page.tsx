import AdminPresetList from "@/components/adminPresets/AdminPresetList";
import NewAdminPresetModal from "@/components/adminPresets/AdminPresetModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AdminPresets() {
  await checkAuth();
  const { adminPresets } = await api.adminPresets.getAdminPresets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Admin Presets</h1>
        <NewAdminPresetModal />
      </div>
      <AdminPresetList adminPresets={adminPresets} />
    </main>
  );
}
