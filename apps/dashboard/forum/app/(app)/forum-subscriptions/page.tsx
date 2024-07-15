import ForumSubscriptionList from "@/components/forumSubscriptions/ForumSubscriptionList";
import NewForumSubscriptionModal from "@/components/forumSubscriptions/ForumSubscriptionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ForumSubscriptions() {
  await checkAuth();
  const { forumSubscriptions } = await api.forumSubscriptions.getForumSubscriptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Subscriptions</h1>
        <NewForumSubscriptionModal />
      </div>
      <ForumSubscriptionList forumSubscriptions={forumSubscriptions} />
    </main>
  );
}
