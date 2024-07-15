"use client";
import { CompleteFaq } from "@soco/faq-db/schema/faqs";
import { trpc } from "@/lib/trpc/client";
import FaqModal from "./FaqModal";


export default function FaqList({ faqs }: { faqs: CompleteFaq[] }) {
  const { data: f } = trpc.faqs.getFaqs.useQuery(undefined, {
    initialData: { faqs },
    refetchOnMount: false,
  });

  if (f.faqs.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.faqs.map((faq) => (
        <Faq faq={faq} key={faq.id} />
      ))}
    </ul>
  );
}

const Faq = ({ faq }: { faq: CompleteFaq }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{faq.question}</div>
      </div>
      <FaqModal faq={faq} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No faqs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new faq.
      </p>
      <div className="mt-6">
        <FaqModal emptyState={true} />
      </div>
    </div>
  );
};

