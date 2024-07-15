import RepositoryOnedriveAccessList from "@/components/repositoryOnedriveAccesses/RepositoryOnedriveAccessList";
import NewRepositoryOnedriveAccessModal from "@/components/repositoryOnedriveAccesses/RepositoryOnedriveAccessModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function RepositoryOnedriveAccesses() {
  await checkAuth();
  const { repositoryOnedriveAccesses } = await api.repositoryOnedriveAccesses.getRepositoryOnedriveAccesses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Repository Onedrive Accesses</h1>
        <NewRepositoryOnedriveAccessModal />
      </div>
      <RepositoryOnedriveAccessList repositoryOnedriveAccesses={repositoryOnedriveAccesses} />
    </main>
  );
}
