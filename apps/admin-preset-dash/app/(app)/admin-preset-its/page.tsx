import AdminPresetItList from "@/components/adminPresetIts/AdminPresetItList";
import NewAdminPresetItModal from "@/components/adminPresetIts/AdminPresetItModal";
import { api } from "@/lib/trpc/api";

export default async function AdminPresetIts() {
  const { adminPresetIts } = await api.adminPresetIts.getAdminPresetIts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Admin Preset Its</h1>
        <NewAdminPresetItModal />
      </div>
      <AdminPresetItList adminPresetIts={adminPresetIts} />
    </main>
  );
}
