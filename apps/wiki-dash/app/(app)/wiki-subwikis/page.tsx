import WikiSubwikiList from "@/components/wikiSubwikis/WikiSubwikiList";
import NewWikiSubwikiModal from "@/components/wikiSubwikis/WikiSubwikiModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function WikiSubwikis() {
  await checkAuth();
  const { wikiSubwikis } = await api.wikiSubwikis.getWikiSubwikis.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wiki Subwikis</h1>
        <NewWikiSubwikiModal />
      </div>
      <WikiSubwikiList wikiSubwikis={wikiSubwikis} />
    </main>
  );
}
