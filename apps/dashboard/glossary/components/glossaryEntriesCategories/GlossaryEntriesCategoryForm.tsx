"use client";

import { GlossaryEntriesCategory, NewGlossaryEntriesCategoryParams, insertGlossaryEntriesCategoryParams } from "@soco/glossary-db/schema/glossaryEntriesCategories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@soco/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GlossaryEntriesCategoryForm = ({
  glossaryEntriesCategory,
  closeModal,
}: {
  glossaryEntriesCategory?: GlossaryEntriesCategory;
  closeModal?: () => void;
}) => {
  
  const editing = !!glossaryEntriesCategory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGlossaryEntriesCategoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGlossaryEntriesCategoryParams),
    defaultValues: glossaryEntriesCategory ?? {
      categoryId: "",
     entryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.glossaryEntriesCategories.getGlossaryEntriesCategories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Glossary Entries Category ${action}d!`);
  };

  const { mutate: createGlossaryEntriesCategory, isLoading: isCreating } =
    trpc.glossaryEntriesCategories.createGlossaryEntriesCategory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGlossaryEntriesCategory, isLoading: isUpdating } =
    trpc.glossaryEntriesCategories.updateGlossaryEntriesCategory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGlossaryEntriesCategory, isLoading: isDeleting } =
    trpc.glossaryEntriesCategories.deleteGlossaryEntriesCategory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGlossaryEntriesCategoryParams) => {
    if (editing) {
      updateGlossaryEntriesCategory({ ...values, id: glossaryEntriesCategory.id });
    } else {
      createGlossaryEntriesCategory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Category Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Entry Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteGlossaryEntriesCategory({ id: glossaryEntriesCategory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GlossaryEntriesCategoryForm;
