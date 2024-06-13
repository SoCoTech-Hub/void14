"use client";

import { ToolPolicyAcceptance, NewToolPolicyAcceptanceParams, insertToolPolicyAcceptanceParams } from "@/lib/db/schema/toolPolicyAcceptances";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ToolPolicyAcceptanceForm = ({
  toolPolicyAcceptance,
  closeModal,
}: {
  toolPolicyAcceptance?: ToolPolicyAcceptance;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolPolicyAcceptance?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolPolicyAcceptanceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolPolicyAcceptanceParams),
    defaultValues: toolPolicyAcceptance ?? {
      lang: "",
     note: "",
     policyVersionId: "",
     status: false,
     userModified: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolPolicyAcceptances.getToolPolicyAcceptances.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Policy Acceptance ${action}d!`);
  };

  const { mutate: createToolPolicyAcceptance, isLoading: isCreating } =
    trpc.toolPolicyAcceptances.createToolPolicyAcceptance.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolPolicyAcceptance, isLoading: isUpdating } =
    trpc.toolPolicyAcceptances.updateToolPolicyAcceptance.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolPolicyAcceptance, isLoading: isDeleting } =
    trpc.toolPolicyAcceptances.deleteToolPolicyAcceptance.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolPolicyAcceptanceParams) => {
    if (editing) {
      updateToolPolicyAcceptance({ ...values, id: toolPolicyAcceptance.id });
    } else {
      createToolPolicyAcceptance(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => (<FormItem>
              <FormLabel>Lang</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (<FormItem>
              <FormLabel>Note</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="policyVersionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Policy Version Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userModified"
          render={({ field }) => (<FormItem>
              <FormLabel>User Modified</FormLabel>
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
            onClick={() => deleteToolPolicyAcceptance({ id: toolPolicyAcceptance.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolPolicyAcceptanceForm;
