import ExternalServiceList from "@/components/externalServices/ExternalServiceList";
import NewExternalServiceModal from "@/components/externalServices/ExternalServiceModal";
import { api } from "@/lib/trpc/api";

export default async function ExternalServices() {
  const { externalServices } = await api.externalServices.getExternalServices.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">External Services</h1>
        <NewExternalServiceModal />
      </div>
      <ExternalServiceList externalServices={externalServices} />
    </main>
  );
}
