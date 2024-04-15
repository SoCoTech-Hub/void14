import BursaryList from "@/components/bursaries/BursaryList";
import NewBursaryModal from "@/components/bursaries/BursaryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Bursaries() {
  await checkAuth();
  const { bursaries } = await api.bursaries.getBursaries.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Bursaries</h1>
        <NewBursaryModal />
      </div>
      <BursaryList bursaries={bursaries} />
    </main>
  );
}
