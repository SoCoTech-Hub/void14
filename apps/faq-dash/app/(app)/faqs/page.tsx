import FaqList from "@/components/faqs/FaqList";
import NewFaqModal from "@/components/faqs/FaqModal";
import { api } from "@/lib/trpc/api";

export default async function Faqs() {
  const { faqs } = await api.faqs.getFaqs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Faqs</h1>
        <NewFaqModal />
      </div>
      <FaqList faqs={faqs} />
    </main>
  );
}
