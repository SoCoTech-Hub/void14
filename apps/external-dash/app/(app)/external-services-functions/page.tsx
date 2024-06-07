import ExternalServicesFunctionList from "@/components/externalServicesFunctions/ExternalServicesFunctionList";
import NewExternalServicesFunctionModal from "@/components/externalServicesFunctions/ExternalServicesFunctionModal";
import { api } from "@/lib/trpc/api";

export default async function ExternalServicesFunctions() {
  const { externalServicesFunctions } = await api.externalServicesFunctions.getExternalServicesFunctions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">External Services Functions</h1>
        <NewExternalServicesFunctionModal />
      </div>
      <ExternalServicesFunctionList externalServicesFunctions={externalServicesFunctions} />
    </main>
  );
}
