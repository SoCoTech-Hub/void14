import AdminPresetsAppList from "@/components/adminPresetsApps/AdminPresetsAppList";
import NewAdminPresetsAppModal from "@/components/adminPresetsApps/AdminPresetsAppModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AdminPresetsApps() {
  await checkAuth();
  const { adminPresetsApps } = await api.adminPresetsApps.getAdminPresetsApps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Admin Presets Apps</h1>
        <NewAdminPresetsAppModal />
      </div>
      <AdminPresetsAppList adminPresetsApps={adminPresetsApps} />
    </main>
  );
}
