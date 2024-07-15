import InmailList from "@/components/inmails/InmailList";
import NewInmailModal from "@/components/inmails/InmailModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Inmails() {
  await checkAuth();
  const { inmails } = await api.inmails.getInmails.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Inmails</h1>
        <NewInmailModal />
      </div>
      <InmailList inmails={inmails} />
    </main>
  );
}
