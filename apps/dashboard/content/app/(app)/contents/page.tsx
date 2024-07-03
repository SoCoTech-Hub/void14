import ContentList from "@/components/contents/ContentList";
import NewContentModal from "@/components/contents/ContentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Contents() {
  await checkAuth();
  const { contents } = await api.contents.getContents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Contents</h1>
        <NewContentModal />
      </div>
      <ContentList contents={contents} />
    </main>
  );
}
