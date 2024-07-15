"use client";

import { QuestionAttempt, NewQuestionAttemptParams, insertQuestionAttemptParams } from "@soco/question-db/schema/questionAttempts";
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

const QuestionAttemptForm = ({
  questionAttempt,
  closeModal,
}: {
  questionAttempt?: QuestionAttempt;
  closeModal?: () => void;
}) => {
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const { data: questionUsages } = trpc.questionUsages.getQuestionUsages.useQuery();
  const editing = !!questionAttempt?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionAttemptParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionAttemptParams),
    defaultValues: questionAttempt ?? {
      behaviour: "",
     flagged: false,
     maxFraction: 0.0,
     maxMark: 0.0,
     minFraction: 0.0,
     questionId: "",
     questionSummary: "",
     questionUsageId: "",
     responseSummary: "",
     rightAnswer: "",
     slot: 0,
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

    await utils.questionAttempts.getQuestionAttempts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Attempt ${action}d!`);
  };

  const { mutate: createQuestionAttempt, isLoading: isCreating } =
    trpc.questionAttempts.createQuestionAttempt.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionAttempt, isLoading: isUpdating } =
    trpc.questionAttempts.updateQuestionAttempt.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionAttempt, isLoading: isDeleting } =
    trpc.questionAttempts.deleteQuestionAttempt.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionAttemptParams) => {
    if (editing) {
      updateQuestionAttempt({ ...values, id: questionAttempt.id });
    } else {
      createQuestionAttempt(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="behaviour"
          render={({ field }) => (<FormItem>
              <FormLabel>Behaviour</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flagged"
          render={({ field }) => (<FormItem>
              <FormLabel>Flagged</FormLabel>
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
          name="maxFraction"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Fraction</FormLabel>
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
          name="minFraction"
          render={({ field }) => (<FormItem>
              <FormLabel>Min Fraction</FormLabel>
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
          name="questionSummary"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Summary</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionUsageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Usage Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question usage" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionUsages?.questionUsages.map((questionUsage) => (
                      <SelectItem key={questionUsage.id} value={questionUsage.id.toString()}>
                        {questionUsage.id}  {/* TODO: Replace with a field from the questionUsage model */}
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
          name="responseSummary"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Summary</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rightAnswer"
          render={({ field }) => (<FormItem>
              <FormLabel>Right Answer</FormLabel>
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
            onClick={() => deleteQuestionAttempt({ id: questionAttempt.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionAttemptForm;
