import WikiPageList from "@/components/wikiPages/WikiPageList";
import NewWikiPageModal from "@/components/wikiPages/WikiPageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function WikiPages() {
  await checkAuth();
  const { wikiPages } = await api.wikiPages.getWikiPages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wiki Pages</h1>
        <NewWikiPageModal />
      </div>
      <WikiPageList wikiPages={wikiPages} />
    </main>
  );
}
