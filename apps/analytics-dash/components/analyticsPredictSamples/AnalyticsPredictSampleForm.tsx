"use client";

import { AnalyticsPredictSample, NewAnalyticsPredictSampleParams, insertAnalyticsPredictSampleParams } from "@/lib/db/schema/analyticsPredictSamples";
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

const AnalyticsPredictSampleForm = ({
  analyticsPredictSample,
  closeModal,
}: {
  analyticsPredictSample?: AnalyticsPredictSample;
  closeModal?: () => void;
}) => {
  
  const editing = !!analyticsPredictSample?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAnalyticsPredictSampleParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAnalyticsPredictSampleParams),
    defaultValues: analyticsPredictSample ?? {
      analysableId: "",
     modelId: "",
     rangeIndex: "",
     sampleIds: "",
     timeSplitting: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.analyticsPredictSamples.getAnalyticsPredictSamples.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Analytics Predict Sample ${action}d!`);
  };

  const { mutate: createAnalyticsPredictSample, isLoading: isCreating } =
    trpc.analyticsPredictSamples.createAnalyticsPredictSample.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAnalyticsPredictSample, isLoading: isUpdating } =
    trpc.analyticsPredictSamples.updateAnalyticsPredictSample.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAnalyticsPredictSample, isLoading: isDeleting } =
    trpc.analyticsPredictSamples.deleteAnalyticsPredictSample.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAnalyticsPredictSampleParams) => {
    if (editing) {
      updateAnalyticsPredictSample({ ...values, id: analyticsPredictSample.id });
    } else {
      createAnalyticsPredictSample(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="analysableId"
          render={({ field }) => (<FormItem>
              <FormLabel>Analysable Id</FormLabel>
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
          name="rangeIndex"
          render={({ field }) => (<FormItem>
              <FormLabel>Range Index</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sampleIds"
          render={({ field }) => (<FormItem>
              <FormLabel>Sample Ids</FormLabel>
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
            onClick={() => deleteAnalyticsPredictSample({ id: analyticsPredictSample.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AnalyticsPredictSampleForm;
