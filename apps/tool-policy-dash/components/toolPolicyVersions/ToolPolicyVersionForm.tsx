"use client";

import { ToolPolicyVersion, NewToolPolicyVersionParams, insertToolPolicyVersionParams } from "@/lib/db/schema/toolPolicyVersions";
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

const ToolPolicyVersionForm = ({
  toolPolicyVersion,
  closeModal,
}: {
  toolPolicyVersion?: ToolPolicyVersion;
  closeModal?: () => void;
}) => {
  const { data: toolPolicies } = trpc.toolPolicies.getToolPolicies.useQuery();
  const editing = !!toolPolicyVersion?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolPolicyVersionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolPolicyVersionParams),
    defaultValues: toolPolicyVersion ?? {
      agreementStyle: 0,
     archived: 0,
     audience: 0,
     content: "",
     contentFormat: 0,
     name: "",
     optional: 0,
     toolPolicyId: "",
     revision: "",
     summary: "",
     summaryFormat: 0,
     type: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolPolicyVersions.getToolPolicyVersions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Policy Version ${action}d!`);
  };

  const { mutate: createToolPolicyVersion, isLoading: isCreating } =
    trpc.toolPolicyVersions.createToolPolicyVersion.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolPolicyVersion, isLoading: isUpdating } =
    trpc.toolPolicyVersions.updateToolPolicyVersion.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolPolicyVersion, isLoading: isDeleting } =
    trpc.toolPolicyVersions.deleteToolPolicyVersion.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolPolicyVersionParams) => {
    if (editing) {
      updateToolPolicyVersion({ ...values, id: toolPolicyVersion.id });
    } else {
      createToolPolicyVersion(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="agreementStyle"
          render={({ field }) => (<FormItem>
              <FormLabel>Agreement Style</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="archived"
          render={({ field }) => (<FormItem>
              <FormLabel>Archived</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="audience"
          render={({ field }) => (<FormItem>
              <FormLabel>Audience</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (<FormItem>
              <FormLabel>Content</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Content Format</FormLabel>
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
        <FormField
          control={form.control}
          name="optional"
          render={({ field }) => (<FormItem>
              <FormLabel>Optional</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toolPolicyId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Policy Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool policy" />
                  </SelectTrigger>
                  <SelectContent>
                    {toolPolicies?.toolPolicies.map((toolPolicy) => (
                      <SelectItem key={toolPolicy.id} value={toolPolicy.id.toString()}>
                        {toolPolicy.id}  {/* TODO: Replace with a field from the toolPolicy model */}
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
          name="revision"
          render={({ field }) => (<FormItem>
              <FormLabel>Revision</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (<FormItem>
              <FormLabel>Summary</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summaryFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Summary Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (<FormItem>
              <FormLabel>Type</FormLabel>
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
            onClick={() => deleteToolPolicyVersion({ id: toolPolicyVersion.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolPolicyVersionForm;
