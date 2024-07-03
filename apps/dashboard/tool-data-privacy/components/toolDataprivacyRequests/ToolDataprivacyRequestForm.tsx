"use client";

import { ToolDataprivacyRequest, NewToolDataprivacyRequestParams, insertToolDataprivacyRequestParams } from "@/lib/db/schema/toolDataprivacyRequests";
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

const ToolDataprivacyRequestForm = ({
  toolDataprivacyRequest,
  closeModal,
}: {
  toolDataprivacyRequest?: ToolDataprivacyRequest;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolDataprivacyRequest?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyRequestParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyRequestParams),
    defaultValues: toolDataprivacyRequest ?? {
      comments: "",
     commentsFormat: 0,
     creationMethod: "",
     dpo: "",
     dpoComment: "",
     dpoCommentFormat: 0,
     requestedBy: "",
     status: 0,
     systemApproved: false,
     type: "",
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

    await utils.toolDataprivacyRequests.getToolDataprivacyRequests.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Request ${action}d!`);
  };

  const { mutate: createToolDataprivacyRequest, isLoading: isCreating } =
    trpc.toolDataprivacyRequests.createToolDataprivacyRequest.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyRequest, isLoading: isUpdating } =
    trpc.toolDataprivacyRequests.updateToolDataprivacyRequest.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyRequest, isLoading: isDeleting } =
    trpc.toolDataprivacyRequests.deleteToolDataprivacyRequest.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyRequestParams) => {
    if (editing) {
      updateToolDataprivacyRequest({ ...values, id: toolDataprivacyRequest.id });
    } else {
      createToolDataprivacyRequest(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (<FormItem>
              <FormLabel>Comments</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commentsFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Comments Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creationMethod"
          render={({ field }) => (<FormItem>
              <FormLabel>Creation Method</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dpo"
          render={({ field }) => (<FormItem>
              <FormLabel>Dpo</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dpoComment"
          render={({ field }) => (<FormItem>
              <FormLabel>Dpo Comment</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dpoCommentFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Dpo Comment Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requestedBy"
          render={({ field }) => (<FormItem>
              <FormLabel>Requested By</FormLabel>
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
          name="systemApproved"
          render={({ field }) => (<FormItem>
              <FormLabel>System Approved</FormLabel>
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
            onClick={() => deleteToolDataprivacyRequest({ id: toolDataprivacyRequest.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyRequestForm;
