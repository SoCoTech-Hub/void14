import InfectedFileList from "@/components/infectedFiles/InfectedFileList";
import NewInfectedFileModal from "@/components/infectedFiles/InfectedFileModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function InfectedFiles() {
  await checkAuth();
  const { infectedFiles } = await api.infectedFiles.getInfectedFiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Infected Files</h1>
        <NewInfectedFileModal />
      </div>
      <InfectedFileList infectedFiles={infectedFiles} />
    </main>
  );
}
