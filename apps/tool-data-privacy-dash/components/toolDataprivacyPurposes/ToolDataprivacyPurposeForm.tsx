"use client";

import { ToolDataprivacyPurpose, NewToolDataprivacyPurposeParams, insertToolDataprivacyPurposeParams } from "@/lib/db/schema/toolDataprivacyPurposes";
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

const ToolDataprivacyPurposeForm = ({
  toolDataprivacyPurpose,
  closeModal,
}: {
  toolDataprivacyPurpose?: ToolDataprivacyPurpose;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolDataprivacyPurpose?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolDataprivacyPurposeParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolDataprivacyPurposeParams),
    defaultValues: toolDataprivacyPurpose ?? {
      description: "",
     descriptionFormat: 0,
     lawfulBases: "",
     name: "",
     protected: false,
     retentionPeriod: "",
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

    await utils.toolDataprivacyPurposes.getToolDataprivacyPurposes.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Dataprivacy Purpose ${action}d!`);
  };

  const { mutate: createToolDataprivacyPurpose, isLoading: isCreating } =
    trpc.toolDataprivacyPurposes.createToolDataprivacyPurpose.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolDataprivacyPurpose, isLoading: isUpdating } =
    trpc.toolDataprivacyPurposes.updateToolDataprivacyPurpose.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolDataprivacyPurpose, isLoading: isDeleting } =
    trpc.toolDataprivacyPurposes.deleteToolDataprivacyPurpose.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolDataprivacyPurposeParams) => {
    if (editing) {
      updateToolDataprivacyPurpose({ ...values, id: toolDataprivacyPurpose.id });
    } else {
      createToolDataprivacyPurpose(values);
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
            onClick={() => deleteToolDataprivacyPurpose({ id: toolDataprivacyPurpose.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolDataprivacyPurposeForm;
