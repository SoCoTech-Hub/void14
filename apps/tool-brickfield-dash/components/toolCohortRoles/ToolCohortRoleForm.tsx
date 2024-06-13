"use client";

import { ToolCohortRole, NewToolCohortRoleParams, insertToolCohortRoleParams } from "@/lib/db/schema/toolCohortRoles";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ToolCohortRoleForm = ({
  toolCohortRole,
  closeModal,
}: {
  toolCohortRole?: ToolCohortRole;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolCohortRole?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolCohortRoleParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolCohortRoleParams),
    defaultValues: toolCohortRole ?? {
      cohortId: "",
     roleId: "",
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

    await utils.toolCohortRoles.getToolCohortRoles.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Cohort Role ${action}d!`);
  };

  const { mutate: createToolCohortRole, isLoading: isCreating } =
    trpc.toolCohortRoles.createToolCohortRole.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolCohortRole, isLoading: isUpdating } =
    trpc.toolCohortRoles.updateToolCohortRole.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolCohortRole, isLoading: isDeleting } =
    trpc.toolCohortRoles.deleteToolCohortRole.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolCohortRoleParams) => {
    if (editing) {
      updateToolCohortRole({ ...values, id: toolCohortRole.id });
    } else {
      createToolCohortRole(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="cohortId"
          render={({ field }) => (<FormItem>
              <FormLabel>Cohort Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (<FormItem>
              <FormLabel>Role Id</FormLabel>
                <FormControl>
            <Input {...field} />
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
            onClick={() => deleteToolCohortRole({ id: toolCohortRole.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolCohortRoleForm;
