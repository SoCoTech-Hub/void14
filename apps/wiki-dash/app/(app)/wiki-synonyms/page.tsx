import WikiSynonymList from "@/components/wikiSynonyms/WikiSynonymList";
import NewWikiSynonymModal from "@/components/wikiSynonyms/WikiSynonymModal";
import { api } from "@/lib/trpc/api";

export default async function WikiSynonyms() {
  const { wikiSynonyms } = await api.wikiSynonyms.getWikiSynonyms.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wiki Synonyms</h1>
        <NewWikiSynonymModal />
      </div>
      <WikiSynonymList wikiSynonyms={wikiSynonyms} />
    </main>
  );
}
