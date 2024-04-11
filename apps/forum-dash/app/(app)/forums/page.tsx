import ForumList from "@/components/forums/ForumList";
import NewForumModal from "@/components/forums/ForumModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Forums() {
  await checkAuth();
  const { forums } = await api.forums.getForums.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Forums</h1>
        <NewForumModal />
      </div>
      <ForumList forums={forums} />
    </main>
  );
}
