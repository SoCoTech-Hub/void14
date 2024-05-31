import UrlList from "@/components/urls/UrlList";
import NewUrlModal from "@/components/urls/UrlModal";
import { api } from "@/lib/trpc/api";

export default async function Urls() {
  const { urls } = await api.urls.getUrls.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Urls</h1>
        <NewUrlModal />
      </div>
      <UrlList urls={urls} />
    </main>
  );
}
