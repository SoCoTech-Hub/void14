"use client";

import { ReportbuilderColumn, NewReportbuilderColumnParams, insertReportbuilderColumnParams } from "@/lib/db/schema/reportbuilderColumns";
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

const ReportbuilderColumnForm = ({
  reportbuilderColumn,
  closeModal,
}: {
  reportbuilderColumn?: ReportbuilderColumn;
  closeModal?: () => void;
}) => {
  
  const editing = !!reportbuilderColumn?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertReportbuilderColumnParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertReportbuilderColumnParams),
    defaultValues: reportbuilderColumn ?? {
      aggregation: "",
     columnOrder: 0,
     heading: "",
     reportId: "",
     uniqueIdentifier: "",
     sortDirection: false,
     sortEnabled: false,
     sortOrder: 0,
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

    await utils.reportbuilderColumns.getReportbuilderColumns.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Reportbuilder Column ${action}d!`);
  };

  const { mutate: createReportbuilderColumn, isLoading: isCreating } =
    trpc.reportbuilderColumns.createReportbuilderColumn.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateReportbuilderColumn, isLoading: isUpdating } =
    trpc.reportbuilderColumns.updateReportbuilderColumn.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteReportbuilderColumn, isLoading: isDeleting } =
    trpc.reportbuilderColumns.deleteReportbuilderColumn.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewReportbuilderColumnParams) => {
    if (editing) {
      updateReportbuilderColumn({ ...values, id: reportbuilderColumn.id });
    } else {
      createReportbuilderColumn(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="aggregation"
          render={({ field }) => (<FormItem>
              <FormLabel>Aggregation</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="columnOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Column Order</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heading"
          render={({ field }) => (<FormItem>
              <FormLabel>Heading</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportId"
          render={({ field }) => (<FormItem>
              <FormLabel>Report Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uniqueIdentifier"
          render={({ field }) => (<FormItem>
              <FormLabel>Unique Identifier</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortDirection"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Direction</FormLabel>
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
          name="sortEnabled"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Enabled</FormLabel>
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
          name="sortOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Order</FormLabel>
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
            onClick={() => deleteReportbuilderColumn({ id: reportbuilderColumn.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ReportbuilderColumnForm;
