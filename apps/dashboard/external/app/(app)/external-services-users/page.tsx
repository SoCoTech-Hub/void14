import ExternalServicesUserList from "@/components/externalServicesUsers/ExternalServicesUserList";
import NewExternalServicesUserModal from "@/components/externalServicesUsers/ExternalServicesUserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ExternalServicesUsers() {
  await checkAuth();
  const { externalServicesUsers } = await api.externalServicesUsers.getExternalServicesUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">External Services Users</h1>
        <NewExternalServicesUserModal />
      </div>
      <ExternalServicesUserList externalServicesUsers={externalServicesUsers} />
    </main>
  );
}
