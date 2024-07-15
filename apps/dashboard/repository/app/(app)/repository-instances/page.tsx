import RepositoryInstanceList from "@/components/repositoryInstances/RepositoryInstanceList";
import NewRepositoryInstanceModal from "@/components/repositoryInstances/RepositoryInstanceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function RepositoryInstances() {
  await checkAuth();
  const { repositoryInstances } = await api.repositoryInstances.getRepositoryInstances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Repository Instances</h1>
        <NewRepositoryInstanceModal />
      </div>
      <RepositoryInstanceList repositoryInstances={repositoryInstances} />
    </main>
  );
}
