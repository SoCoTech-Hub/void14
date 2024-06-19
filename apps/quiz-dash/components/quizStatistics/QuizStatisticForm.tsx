"use client";

import { QuizStatistic, NewQuizStatisticParams, insertQuizStatisticParams } from "@/lib/db/schema/quizStatistics";
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

const QuizStatisticForm = ({
  quizStatistic,
  closeModal,
}: {
  quizStatistic?: QuizStatistic;
  closeModal?: () => void;
}) => {
  
  const editing = !!quizStatistic?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuizStatisticParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuizStatisticParams),
    defaultValues: quizStatistic ?? {
      allAttemptsAvg: 0.0,
     allAttemptsCount: 0,
     cic: 0.0,
     errorRatio: 0.0,
     firstAttemptsAvg: 0.0,
     firstAttemptsCount: 0,
     hashcode: "",
     highestAttemptsAvg: 0.0,
     highestAttemptsCount: 0,
     kurtosis: 0.0,
     lastAttemptsAvg: 0.0,
     lastAttemptsCount: 0,
     median: 0.0,
     skewness: 0.0,
     standardDeviation: 0.0,
     standardError: 0.0,
     whichAttempts: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.quizStatistics.getQuizStatistics.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Quiz Statistic ${action}d!`);
  };

  const { mutate: createQuizStatistic, isLoading: isCreating } =
    trpc.quizStatistics.createQuizStatistic.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuizStatistic, isLoading: isUpdating } =
    trpc.quizStatistics.updateQuizStatistic.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuizStatistic, isLoading: isDeleting } =
    trpc.quizStatistics.deleteQuizStatistic.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuizStatisticParams) => {
    if (editing) {
      updateQuizStatistic({ ...values, id: quizStatistic.id });
    } else {
      createQuizStatistic(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="allAttemptsAvg"
          render={({ field }) => (<FormItem>
              <FormLabel>All Attempts Avg</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allAttemptsCount"
          render={({ field }) => (<FormItem>
              <FormLabel>All Attempts Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cic"
          render={({ field }) => (<FormItem>
              <FormLabel>Cic</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="errorRatio"
          render={({ field }) => (<FormItem>
              <FormLabel>Error Ratio</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstAttemptsAvg"
          render={({ field }) => (<FormItem>
              <FormLabel>First Attempts Avg</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstAttemptsCount"
          render={({ field }) => (<FormItem>
              <FormLabel>First Attempts Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hashcode"
          render={({ field }) => (<FormItem>
              <FormLabel>Hashcode</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="highestAttemptsAvg"
          render={({ field }) => (<FormItem>
              <FormLabel>Highest Attempts Avg</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="highestAttemptsCount"
          render={({ field }) => (<FormItem>
              <FormLabel>Highest Attempts Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kurtosis"
          render={({ field }) => (<FormItem>
              <FormLabel>Kurtosis</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastAttemptsAvg"
          render={({ field }) => (<FormItem>
              <FormLabel>Last Attempts Avg</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastAttemptsCount"
          render={({ field }) => (<FormItem>
              <FormLabel>Last Attempts Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="median"
          render={({ field }) => (<FormItem>
              <FormLabel>Median</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skewness"
          render={({ field }) => (<FormItem>
              <FormLabel>Skewness</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="standardDeviation"
          render={({ field }) => (<FormItem>
              <FormLabel>Standard Deviation</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="standardError"
          render={({ field }) => (<FormItem>
              <FormLabel>Standard Error</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whichAttempts"
          render={({ field }) => (<FormItem>
              <FormLabel>Which Attempts</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
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
            onClick={() => deleteQuizStatistic({ id: quizStatistic.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuizStatisticForm;
