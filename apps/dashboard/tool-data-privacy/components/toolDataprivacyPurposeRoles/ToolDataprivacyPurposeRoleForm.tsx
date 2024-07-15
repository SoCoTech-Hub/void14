"use client";

import { ToolDataprivacyPurposeRole, NewToolDataprivacyPurposeRoleParams, insertToolDataprivacyPurposeRoleParams } from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposeRoles";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ToolDataprivacyPurposeRoleForm = ({
  toolDataprivacyPurposeRole,
  closeModal,
}: {
  toolDataprivacyPurposeRole?: ToolDataprivacyPurposeRole;
  closeModal?: () => void;
}) => {
  const { data: toolDataprivacyPurposes } = trpc.toolDataprivacyPurposes.getToolDataprivacyPurposes.useQuery();
  const editing = !!toolDataprivacyPurposeRole?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyPurposeRoleParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyPurposeRoleParams),
    defaultValues: toolDataprivacyPurposeRole ?? {
      lawfulBases: "",
     protected: false,
     toolDataprivacyPurposeId: "",
     retentionPeriod: "",
     roleId: "",
     sensitiveDataReasons: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolDataprivacyPurposeRoles.getToolDataprivacyPurposeRoles.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Purpose Role ${action}d!`);
  };

  const { mutate: createToolDataprivacyPurposeRole, isLoading: isCreating } =
    trpc.toolDataprivacyPurposeRoles.createToolDataprivacyPurposeRole.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyPurposeRole, isLoading: isUpdating } =
    trpc.toolDataprivacyPurposeRoles.updateToolDataprivacyPurposeRole.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyPurposeRole, isLoading: isDeleting } =
    trpc.toolDataprivacyPurposeRoles.deleteToolDataprivacyPurposeRole.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyPurposeRoleParams) => {
    if (editing) {
      updateToolDataprivacyPurposeRole({ ...values, id: toolDataprivacyPurposeRole.id });
    } else {
      createToolDataprivacyPurposeRole(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="lawfulBases"
          render={({ field }) => (<FormItem>
              <FormLabel>Lawful Bases</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="protected"
          render={({ field }) => (<FormItem>
              <FormLabel>Protected</FormLabel>
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
        <FormField
          control={form.control}
          name="retentionPeriod"
          render={({ field }) => (<FormItem>
              <FormLabel>Retention Period</FormLabel>
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
          name="sensitiveDataReasons"
          render={({ field }) => (<FormItem>
              <FormLabel>Sensitive Data Reasons</FormLabel>
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
            onClick={() => deleteToolDataprivacyPurposeRole({ id: toolDataprivacyPurposeRole.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyPurposeRoleForm;
