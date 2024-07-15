"use client";

import { ToolDataprivacyCtxLevel, NewToolDataprivacyCtxLevelParams, insertToolDataprivacyCtxLevelParams } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxLevels";
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

const ToolDataprivacyCtxLevelForm = ({
  toolDataprivacyCtxLevel,
  closeModal,
}: {
  toolDataprivacyCtxLevel?: ToolDataprivacyCtxLevel;
  closeModal?: () => void;
}) => {
  const { data: toolDataprivacyCategories } = trpc.toolDataprivacyCategories.getToolDataprivacyCategories.useQuery();
  const { data: toolDataprivacyPurposes } = trpc.toolDataprivacyPurposes.getToolDataprivacyPurposes.useQuery();
  const editing = !!toolDataprivacyCtxLevel?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyCtxLevelParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyCtxLevelParams),
    defaultValues: toolDataprivacyCtxLevel ?? {
      toolDataprivacyCategoryId: "",
     contextLevel: "",
     toolDataprivacyPurposeId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolDataprivacyCtxLevels.getToolDataprivacyCtxLevels.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Ctx Level ${action}d!`);
  };

  const { mutate: createToolDataprivacyCtxLevel, isLoading: isCreating } =
    trpc.toolDataprivacyCtxLevels.createToolDataprivacyCtxLevel.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyCtxLevel, isLoading: isUpdating } =
    trpc.toolDataprivacyCtxLevels.updateToolDataprivacyCtxLevel.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyCtxLevel, isLoading: isDeleting } =
    trpc.toolDataprivacyCtxLevels.deleteToolDataprivacyCtxLevel.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyCtxLevelParams) => {
    if (editing) {
      updateToolDataprivacyCtxLevel({ ...values, id: toolDataprivacyCtxLevel.id });
    } else {
      createToolDataprivacyCtxLevel(values);
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
          name="contextLevel"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Level</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toolDataprivacyPurposeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Dataprivacy Purpose Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool dataprivacy purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {toolDataprivacyPurposes?.toolDataprivacyPurposes.map((toolDataprivacyPurpose) => (
                      <SelectItem key={toolDataprivacyPurpose.id} value={toolDataprivacyPurpose.id.toString()}>
                        {toolDataprivacyPurpose.id}  {/* TODO: Replace with a field from the toolDataprivacyPurpose model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteToolDataprivacyCtxLevel({ id: toolDataprivacyCtxLevel.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyCtxLevelForm;
