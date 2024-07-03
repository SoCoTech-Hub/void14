import AdminpresetsAppItList from "@/components/adminpresetsAppIts/AdminpresetsAppItList";
import NewAdminpresetsAppItModal from "@/components/adminpresetsAppIts/AdminpresetsAppItModal";
import { api } from "@/lib/trpc/api";

export default async function AdminpresetsAppIts() {
  const { adminpresetsAppIts } = await api.adminpresetsAppIts.getAdminpresetsAppIts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Adminpresets App Its</h1>
        <NewAdminpresetsAppItModal />
      </div>
      <AdminpresetsAppItList adminpresetsAppIts={adminpresetsAppIts} />
    </main>
  );
}
