import InmailResponseList from "@/components/inmailResponses/InmailResponseList";
import NewInmailResponseModal from "@/components/inmailResponses/InmailResponseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function InmailResponses() {
  await checkAuth();
  const { inmailResponses } = await api.inmailResponses.getInmailResponses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Inmail Responses</h1>
        <NewInmailResponseModal />
      </div>
      <InmailResponseList inmailResponses={inmailResponses} />
    </main>
  );
}
