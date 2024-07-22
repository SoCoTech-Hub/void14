"use client";

import { ReportbuilderAudience, NewReportbuilderAudienceParams, insertReportbuilderAudienceParams } from "@soco/report-builder-db/schema/reportbuilderAudiences";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ReportbuilderAudienceForm = ({
  reportbuilderAudience,
  closeModal,
}: {
  reportbuilderAudience?: ReportbuilderAudience;
  closeModal?: () => void;
}) => {
  
  const editing = !!reportbuilderAudience?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertReportbuilderAudienceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertReportbuilderAudienceParams),
    defaultValues: reportbuilderAudience ?? {
      className: "",
     configData: "",
     heading: "",
     reportId: "",
     userModifiedId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.reportbuilderAudiences.getReportbuilderAudiences.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Reportbuilder Audience ${action}d!`);
  };

  const { mutate: createReportbuilderAudience, isLoading: isCreating } =
    trpc.reportbuilderAudiences.createReportbuilderAudience.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateReportbuilderAudience, isLoading: isUpdating } =
    trpc.reportbuilderAudiences.updateReportbuilderAudience.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteReportbuilderAudience, isLoading: isDeleting } =
    trpc.reportbuilderAudiences.deleteReportbuilderAudience.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewReportbuilderAudienceParams) => {
    if (editing) {
      updateReportbuilderAudience({ ...values, id: reportbuilderAudience.id });
    } else {
      createReportbuilderAudience(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (<FormItem>
              <FormLabel>Class Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="configData"
          render={({ field }) => (<FormItem>
              <FormLabel>Config Data</FormLabel>
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
          name="userModifiedId"
          render={({ field }) => (<FormItem>
              <FormLabel>User Modified Id</FormLabel>
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
            onClick={() => deleteReportbuilderAudience({ id: reportbuilderAudience.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ReportbuilderAudienceForm;
