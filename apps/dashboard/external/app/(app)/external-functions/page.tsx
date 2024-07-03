import ExternalFunctionList from "@/components/externalFunctions/ExternalFunctionList";
import NewExternalFunctionModal from "@/components/externalFunctions/ExternalFunctionModal";
import { api } from "@/lib/trpc/api";

export default async function ExternalFunctions() {
  const { externalFunctions } = await api.externalFunctions.getExternalFunctions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">External Functions</h1>
        <NewExternalFunctionModal />
      </div>
      <ExternalFunctionList externalFunctions={externalFunctions} />
    </main>
  );
}
