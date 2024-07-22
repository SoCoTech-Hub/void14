"use client";

import { ToolDataprivacyCtxExpired, NewToolDataprivacyCtxExpiredParams, insertToolDataprivacyCtxExpiredParams } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxExpireds";
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
import { Checkbox } from "@soco/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ToolDataprivacyCtxExpiredForm = ({
  toolDataprivacyCtxExpired,
  closeModal,
}: {
  toolDataprivacyCtxExpired?: ToolDataprivacyCtxExpired;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolDataprivacyCtxExpired?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyCtxExpiredParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyCtxExpiredParams),
    defaultValues: toolDataprivacyCtxExpired ?? {
      contextId: "",
     defaultExpired: false,
     expiredRoles: "",
     status: 0,
     unexpiredRoles: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolDataprivacyCtxExpireds.getToolDataprivacyCtxExpireds.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Ctx Expired ${action}d!`);
  };

  const { mutate: createToolDataprivacyCtxExpired, isLoading: isCreating } =
    trpc.toolDataprivacyCtxExpireds.createToolDataprivacyCtxExpired.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyCtxExpired, isLoading: isUpdating } =
    trpc.toolDataprivacyCtxExpireds.updateToolDataprivacyCtxExpired.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyCtxExpired, isLoading: isDeleting } =
    trpc.toolDataprivacyCtxExpireds.deleteToolDataprivacyCtxExpired.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyCtxExpiredParams) => {
    if (editing) {
      updateToolDataprivacyCtxExpired({ ...values, id: toolDataprivacyCtxExpired.id });
    } else {
      createToolDataprivacyCtxExpired(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="defaultExpired"
          render={({ field }) => (<FormItem>
              <FormLabel>Default Expired</FormLabel>
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
          name="expiredRoles"
          render={({ field }) => (<FormItem>
              <FormLabel>Expired Roles</FormLabel>
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
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unexpiredRoles"
          render={({ field }) => (<FormItem>
              <FormLabel>Unexpired Roles</FormLabel>
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
            onClick={() => deleteToolDataprivacyCtxExpired({ id: toolDataprivacyCtxExpired.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyCtxExpiredForm;
