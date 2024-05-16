import WikiLinkList from "@/components/wikiLinks/WikiLinkList";
import NewWikiLinkModal from "@/components/wikiLinks/WikiLinkModal";
import { api } from "@/lib/trpc/api";

export default async function WikiLinks() {
  const { wikiLinks } = await api.wikiLinks.getWikiLinks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wiki Links</h1>
        <NewWikiLinkModal />
      </div>
      <WikiLinkList wikiLinks={wikiLinks} />
    </main>
  );
}
