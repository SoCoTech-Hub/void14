import RepositoryInstanceConfigList from "@/components/repositoryInstanceConfigs/RepositoryInstanceConfigList";
import NewRepositoryInstanceConfigModal from "@/components/repositoryInstanceConfigs/RepositoryInstanceConfigModal";
import { api } from "@/lib/trpc/api";

export default async function RepositoryInstanceConfigs() {
  const { repositoryInstanceConfigs } = await api.repositoryInstanceConfigs.getRepositoryInstanceConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Repository Instance Configs</h1>
        <NewRepositoryInstanceConfigModal />
      </div>
      <RepositoryInstanceConfigList repositoryInstanceConfigs={repositoryInstanceConfigs} />
    </main>
  );
}
