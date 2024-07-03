"use client";
import { CompleteToolRecyclebinCategory } from "@/lib/db/schema/toolRecyclebinCategories";
import { trpc } from "@/lib/trpc/client";
import ToolRecyclebinCategoryModal from "./ToolRecyclebinCategoryModal";


export default function ToolRecyclebinCategoryList({ toolRecyclebinCategories }: { toolRecyclebinCategories: CompleteToolRecyclebinCategory[] }) {
  const { data: t } = trpc.toolRecyclebinCategories.getToolRecyclebinCategories.useQuery(undefined, {
    initialData: { toolRecyclebinCategories },
    refetchOnMount: false,
  });

  if (t.toolRecyclebinCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolRecyclebinCategories.map((toolRecyclebinCategory) => (
        <ToolRecyclebinCategory toolRecyclebinCategory={toolRecyclebinCategory} key={toolRecyclebinCategory.id} />
      ))}
    </ul>
  );
}

const ToolRecyclebinCategory = ({ toolRecyclebinCategory }: { toolRecyclebinCategory: CompleteToolRecyclebinCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolRecyclebinCategory.categoryId}</div>
      </div>
      <ToolRecyclebinCategoryModal toolRecyclebinCategory={toolRecyclebinCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool recyclebin categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool recyclebin category.
      </p>
      <div className="mt-6">
        <ToolRecyclebinCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

