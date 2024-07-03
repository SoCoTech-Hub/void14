import WikiList from "@/components/wikis/WikiList";
import NewWikiModal from "@/components/wikis/WikiModal";
import { api } from "@/lib/trpc/api";

export default async function Wikis() {
  const { wikis } = await api.wikis.getWikis.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wikis</h1>
        <NewWikiModal />
      </div>
      <WikiList wikis={wikis} />
    </main>
  );
}
