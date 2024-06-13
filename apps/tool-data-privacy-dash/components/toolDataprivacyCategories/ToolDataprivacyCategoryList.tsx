"use client";
import { CompleteToolDataprivacyCategory } from "@/lib/db/schema/toolDataprivacyCategories";
import { trpc } from "@/lib/trpc/client";
import ToolDataprivacyCategoryModal from "./ToolDataprivacyCategoryModal";


export default function ToolDataprivacyCategoryList({ toolDataprivacyCategories }: { toolDataprivacyCategories: CompleteToolDataprivacyCategory[] }) {
  const { data: t } = trpc.toolDataprivacyCategories.getToolDataprivacyCategories.useQuery(undefined, {
    initialData: { toolDataprivacyCategories },
    refetchOnMount: false,
  });

  if (t.toolDataprivacyCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolDataprivacyCategories.map((toolDataprivacyCategory) => (
        <ToolDataprivacyCategory toolDataprivacyCategory={toolDataprivacyCategory} key={toolDataprivacyCategory.id} />
      ))}
    </ul>
  );
}

const ToolDataprivacyCategory = ({ toolDataprivacyCategory }: { toolDataprivacyCategory: CompleteToolDataprivacyCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolDataprivacyCategory.description}</div>
      </div>
      <ToolDataprivacyCategoryModal toolDataprivacyCategory={toolDataprivacyCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool dataprivacy categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool dataprivacy category.
      </p>
      <div className="mt-6">
        <ToolDataprivacyCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

