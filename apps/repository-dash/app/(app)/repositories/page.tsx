import RepositoryList from "@/components/repositories/RepositoryList";
import NewRepositoryModal from "@/components/repositories/RepositoryModal";
import { api } from "@/lib/trpc/api";

export default async function Repositories() {
  const { repositories } = await api.repositories.getRepositories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Repositories</h1>
        <NewRepositoryModal />
      </div>
      <RepositoryList repositories={repositories} />
    </main>
  );
}
