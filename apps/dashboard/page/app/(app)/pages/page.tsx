import PageList from "@/components/pages/PageList";
import NewPageModal from "@/components/pages/PageModal";
import { api } from "@/lib/trpc/api";

export default async function Pages() {
  const { pages } = await api.pages.getPages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Pages</h1>
        <NewPageModal />
      </div>
      <PageList pages={pages} />
    </main>
  );
}
