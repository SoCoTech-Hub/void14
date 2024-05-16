import WikiVersionList from "@/components/wikiVersions/WikiVersionList";
import NewWikiVersionModal from "@/components/wikiVersions/WikiVersionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function WikiVersions() {
  await checkAuth();
  const { wikiVersions } = await api.wikiVersions.getWikiVersions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Wiki Versions</h1>
        <NewWikiVersionModal />
      </div>
      <WikiVersionList wikiVersions={wikiVersions} />
    </main>
  );
}
