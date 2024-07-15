import BursaryResponseList from "@/components/bursaryResponses/BursaryResponseList";
import NewBursaryResponseModal from "@/components/bursaryResponses/BursaryResponseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function BursaryResponses() {
  await checkAuth();
  const { bursaryResponses } = await api.bursaryResponses.getBursaryResponses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Bursary Responses</h1>
        <NewBursaryResponseModal />
      </div>
      <BursaryResponseList bursaryResponses={bursaryResponses} />
    </main>
  );
}
