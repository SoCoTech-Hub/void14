import ForumQueueList from "@/components/forumQueues/ForumQueueList";
import NewForumQueueModal from "@/components/forumQueues/ForumQueueModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ForumQueues() {
  await checkAuth();
  const { forumQueues } = await api.forumQueues.getForumQueues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forum Queues</h1>
        <NewForumQueueModal />
      </div>
      <ForumQueueList forumQueues={forumQueues} />
    </main>
  );
}
