import NextOfKinList from "@/components/nextOfKins/NextOfKinList";
import NewNextOfKinModal from "@/components/nextOfKins/NextOfKinModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function NextOfKins() {
  await checkAuth();
  const { nextOfKins } = await api.nextOfKins.getNextOfKins.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Next Of Kins</h1>
        <NewNextOfKinModal />
      </div>
      <NextOfKinList nextOfKins={nextOfKins} />
    </main>
  );
}
