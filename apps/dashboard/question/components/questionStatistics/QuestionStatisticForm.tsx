"use client";

import { QuestionStatistic, NewQuestionStatisticParams, insertQuestionStatisticParams } from "@soco/question-db/schema/questionStatistics";
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

const QuestionStatisticForm = ({
  questionStatistic,
  closeModal,
}: {
  questionStatistic?: QuestionStatistic;
  closeModal?: () => void;
}) => {
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionStatistic?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionStatisticParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionStatisticParams),
    defaultValues: questionStatistic ?? {
      discriminationIndex: 0.0,
     discriminativeEfficiency: 0.0,
     effectiveWeight: 0.0,
     facility: 0.0,
     hashcode: "",
     maxMark: 0.0,
     negCovar: false,
     positions: "",
     questionId: "",
     randomGuessScore: 0.0,
     s: 0,
     sd: 0.0,
     slot: 0,
     subQuestion: false,
     subQuestions: "",
     variant: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionStatistics.getQuestionStatistics.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Statistic ${action}d!`);
  };

  const { mutate: createQuestionStatistic, isLoading: isCreating } =
    trpc.questionStatistics.createQuestionStatistic.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionStatistic, isLoading: isUpdating } =
    trpc.questionStatistics.updateQuestionStatistic.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionStatistic, isLoading: isDeleting } =
    trpc.questionStatistics.deleteQuestionStatistic.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionStatisticParams) => {
    if (editing) {
      updateQuestionStatistic({ ...values, id: questionStatistic.id });
    } else {
      createQuestionStatistic(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="discriminationIndex"
          render={({ field }) => (<FormItem>
              <FormLabel>Discrimination Index</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discriminativeEfficiency"
          render={({ field }) => (<FormItem>
              <FormLabel>Discriminative Efficiency</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="effectiveWeight"
          render={({ field }) => (<FormItem>
              <FormLabel>Effective Weight</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facility"
          render={({ field }) => (<FormItem>
              <FormLabel>Facility</FormLabel>
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
          name="maxMark"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Mark</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="negCovar"
          render={({ field }) => (<FormItem>
              <FormLabel>Neg Covar</FormLabel>
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
          name="positions"
          render={({ field }) => (<FormItem>
              <FormLabel>Positions</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question" />
                  </SelectTrigger>
                  <SelectContent>
                    {questions?.questions.map((question) => (
                      <SelectItem key={question.id} value={question.id.toString()}>
                        {question.id}  {/* TODO: Replace with a field from the question model */}
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
          name="randomGuessScore"
          render={({ field }) => (<FormItem>
              <FormLabel>Random Guess Score</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="s"
          render={({ field }) => (<FormItem>
              <FormLabel>S</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sd"
          render={({ field }) => (<FormItem>
              <FormLabel>Sd</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slot"
          render={({ field }) => (<FormItem>
              <FormLabel>Slot</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subQuestion"
          render={({ field }) => (<FormItem>
              <FormLabel>Sub Question</FormLabel>
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
          name="subQuestions"
          render={({ field }) => (<FormItem>
              <FormLabel>Sub Questions</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (<FormItem>
              <FormLabel>Variant</FormLabel>
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
            onClick={() => deleteQuestionStatistic({ id: questionStatistic.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionStatisticForm;
