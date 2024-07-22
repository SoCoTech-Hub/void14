"use client";

import { ToolDataprivacyCategory, NewToolDataprivacyCategoryParams, insertToolDataprivacyCategoryParams } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCategories";
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

const ToolDataprivacyCategoryForm = ({
  toolDataprivacyCategory,
  closeModal,
}: {
  toolDataprivacyCategory?: ToolDataprivacyCategory;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolDataprivacyCategory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyCategoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyCategoryParams),
    defaultValues: toolDataprivacyCategory ?? {
      description: "",
     descriptionFormat: 0,
     name: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolDataprivacyCategories.getToolDataprivacyCategories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Category ${action}d!`);
  };

  const { mutate: createToolDataprivacyCategory, isLoading: isCreating } =
    trpc.toolDataprivacyCategories.createToolDataprivacyCategory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyCategory, isLoading: isUpdating } =
    trpc.toolDataprivacyCategories.updateToolDataprivacyCategory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyCategory, isLoading: isDeleting } =
    trpc.toolDataprivacyCategories.deleteToolDataprivacyCategory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyCategoryParams) => {
    if (editing) {
      updateToolDataprivacyCategory({ ...values, id: toolDataprivacyCategory.id });
    } else {
      createToolDataprivacyCategory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Description Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
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
            onClick={() => deleteToolDataprivacyCategory({ id: toolDataprivacyCategory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyCategoryForm;
