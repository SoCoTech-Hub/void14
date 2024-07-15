import BadgeCriteriaMetList from "@/components/badgeCriteriaMets/BadgeCriteriaMetList";
import NewBadgeCriteriaMetModal from "@/components/badgeCriteriaMets/BadgeCriteriaMetModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function BadgeCriteriaMets() {
  await checkAuth();
  const { badgeCriteriaMets } = await api.badgeCriteriaMets.getBadgeCriteriaMets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Badge Criteria Mets</h1>
        <NewBadgeCriteriaMetModal />
      </div>
      <BadgeCriteriaMetList badgeCriteriaMets={badgeCriteriaMets} />
    </main>
  );
}
