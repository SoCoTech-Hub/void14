"use client";

import { ToolDataprivacyCtxInstance, NewToolDataprivacyCtxInstanceParams, insertToolDataprivacyCtxInstanceParams } from "@/lib/db/schema/toolDataprivacyCtxInstances";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ToolDataprivacyCtxInstanceForm = ({
  toolDataprivacyCtxInstance,
  closeModal,
}: {
  toolDataprivacyCtxInstance?: ToolDataprivacyCtxInstance;
  closeModal?: () => void;
}) => {
  const { data: toolDataprivacyCategories } = trpc.toolDataprivacyCategories.getToolDataprivacyCategories.useQuery();
  const editing = !!toolDataprivacyCtxInstance?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyCtxInstanceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyCtxInstanceParams),
    defaultValues: toolDataprivacyCtxInstance ?? {
      toolDataprivacyCategoryId: "",
     contextId: "",
     purposeId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolDataprivacyCtxInstances.getToolDataprivacyCtxInstances.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Ctx Instance ${action}d!`);
  };

  const { mutate: createToolDataprivacyCtxInstance, isLoading: isCreating } =
    trpc.toolDataprivacyCtxInstances.createToolDataprivacyCtxInstance.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyCtxInstance, isLoading: isUpdating } =
    trpc.toolDataprivacyCtxInstances.updateToolDataprivacyCtxInstance.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyCtxInstance, isLoading: isDeleting } =
    trpc.toolDataprivacyCtxInstances.deleteToolDataprivacyCtxInstance.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyCtxInstanceParams) => {
    if (editing) {
      updateToolDataprivacyCtxInstance({ ...values, id: toolDataprivacyCtxInstance.id });
    } else {
      createToolDataprivacyCtxInstance(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="toolDataprivacyCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Dataprivacy Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool dataprivacy category" />
                  </SelectTrigger>
                  <SelectContent>
                    {toolDataprivacyCategories?.toolDataprivacyCategories.map((toolDataprivacyCategory) => (
                      <SelectItem key={toolDataprivacyCategory.id} value={toolDataprivacyCategory.id.toString()}>
                        {toolDataprivacyCategory.id}  {/* TODO: Replace with a field from the toolDataprivacyCategory model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purposeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Purpose Id</FormLabel>
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
            onClick={() => deleteToolDataprivacyCtxInstance({ id: toolDataprivacyCtxInstance.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyCtxInstanceForm;
