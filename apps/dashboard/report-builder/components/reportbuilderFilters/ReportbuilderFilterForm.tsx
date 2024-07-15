"use client";

import { ReportbuilderFilter, NewReportbuilderFilterParams, insertReportbuilderFilterParams } from "@soco/report-builder-db/schema/reportbuilderFilters";
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

const ReportbuilderFilterForm = ({
  reportbuilderFilter,
  closeModal,
}: {
  reportbuilderFilter?: ReportbuilderFilter;
  closeModal?: () => void;
}) => {
  
  const editing = !!reportbuilderFilter?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertReportbuilderFilterParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertReportbuilderFilterParams),
    defaultValues: reportbuilderFilter ?? {
      filterOrder: 0,
     heading: "",
     isCondition: false,
     reportId: "",
     uniqueIdentifier: "",
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

    await utils.reportbuilderFilters.getReportbuilderFilters.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Reportbuilder Filter ${action}d!`);
  };

  const { mutate: createReportbuilderFilter, isLoading: isCreating } =
    trpc.reportbuilderFilters.createReportbuilderFilter.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateReportbuilderFilter, isLoading: isUpdating } =
    trpc.reportbuilderFilters.updateReportbuilderFilter.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteReportbuilderFilter, isLoading: isDeleting } =
    trpc.reportbuilderFilters.deleteReportbuilderFilter.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewReportbuilderFilterParams) => {
    if (editing) {
      updateReportbuilderFilter({ ...values, id: reportbuilderFilter.id });
    } else {
      createReportbuilderFilter(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="filterOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Filter Order</FormLabel>
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
          name="isCondition"
          render={({ field }) => (<FormItem>
              <FormLabel>Is Condition</FormLabel>
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
            onClick={() => deleteReportbuilderFilter({ id: reportbuilderFilter.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ReportbuilderFilterForm;
