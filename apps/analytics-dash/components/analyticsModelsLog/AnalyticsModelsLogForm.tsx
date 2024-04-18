"use client";

import { AnalyticsModelsLog, NewAnalyticsModelsLogParams, insertAnalyticsModelsLogParams } from "@/lib/db/schema/analyticsModelsLog";
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

const AnalyticsModelsLogForm = ({
  analyticsModelsLog,
  closeModal,
}: {
  analyticsModelsLog?: AnalyticsModelsLog;
  closeModal?: () => void;
}) => {
  
  const editing = !!analyticsModelsLog?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAnalyticsModelsLogParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAnalyticsModelsLogParams),
    defaultValues: analyticsModelsLog ?? {
      dir: "",
     evaluationMode: "",
     indicators: "",
     info: "",
     modelId: "",
     score: 0.0,
     target: "",
     timeSplitting: "",
     version: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.analyticsModelsLog.getAnalyticsModelsLog.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Analytics Models Log ${action}d!`);
  };

  const { mutate: createAnalyticsModelsLog, isLoading: isCreating } =
    trpc.analyticsModelsLog.createAnalyticsModelsLog.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAnalyticsModelsLog, isLoading: isUpdating } =
    trpc.analyticsModelsLog.updateAnalyticsModelsLog.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAnalyticsModelsLog, isLoading: isDeleting } =
    trpc.analyticsModelsLog.deleteAnalyticsModelsLog.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAnalyticsModelsLogParams) => {
    if (editing) {
      updateAnalyticsModelsLog({ ...values, id: analyticsModelsLog.id });
    } else {
      createAnalyticsModelsLog(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="dir"
          render={({ field }) => (<FormItem>
              <FormLabel>Dir</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="evaluationMode"
          render={({ field }) => (<FormItem>
              <FormLabel>Evaluation Mode</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="indicators"
          render={({ field }) => (<FormItem>
              <FormLabel>Indicators</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (<FormItem>
              <FormLabel>Info</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modelId"
          render={({ field }) => (<FormItem>
              <FormLabel>Model Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (<FormItem>
              <FormLabel>Score</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (<FormItem>
              <FormLabel>Target</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeSplitting"
          render={({ field }) => (<FormItem>
              <FormLabel>Time Splitting</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (<FormItem>
              <FormLabel>Version</FormLabel>
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
            onClick={() => deleteAnalyticsModelsLog({ id: analyticsModelsLog.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AnalyticsModelsLogForm;
