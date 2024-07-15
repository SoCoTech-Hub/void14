import BadgeIssueList from "@/components/badgeIssues/BadgeIssueList";
import NewBadgeIssueModal from "@/components/badgeIssues/BadgeIssueModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function BadgeIssues() {
  await checkAuth();
  const { badgeIssues } = await api.badgeIssues.getBadgeIssues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Badge Issues</h1>
        <NewBadgeIssueModal />
      </div>
      <BadgeIssueList badgeIssues={badgeIssues} />
    </main>
  );
}
