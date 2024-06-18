import RoleAllowViewList from "@/components/roleAllowViews/RoleAllowViewList";
import NewRoleAllowViewModal from "@/components/roleAllowViews/RoleAllowViewModal";
import { api } from "@/lib/trpc/api";

export default async function RoleAllowViews() {
  const { roleAllowViews } = await api.roleAllowViews.getRoleAllowViews.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Allow Views</h1>
        <NewRoleAllowViewModal />
      </div>
      <RoleAllowViewList roleAllowViews={roleAllowViews} />
    </main>
  );
}
