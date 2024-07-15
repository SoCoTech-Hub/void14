"use client";

import { QuestionNumerical, NewQuestionNumericalParams, insertQuestionNumericalParams } from "@soco/question-db/schema/questionNumericals";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuestionNumericalForm = ({
  questionNumerical,
  closeModal,
}: {
  questionNumerical?: QuestionNumerical;
  closeModal?: () => void;
}) => {
  const { data: questionAnswers } = trpc.questionAnswers.getQuestionAnswers.useQuery();
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionNumerical?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionNumericalParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionNumericalParams),
    defaultValues: questionNumerical ?? {
      questionAnswerId: "",
     questionId: "",
     tolerance: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionNumericals.getQuestionNumericals.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Numerical ${action}d!`);
  };

  const { mutate: createQuestionNumerical, isLoading: isCreating } =
    trpc.questionNumericals.createQuestionNumerical.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionNumerical, isLoading: isUpdating } =
    trpc.questionNumericals.updateQuestionNumerical.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionNumerical, isLoading: isDeleting } =
    trpc.questionNumericals.deleteQuestionNumerical.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionNumericalParams) => {
    if (editing) {
      updateQuestionNumerical({ ...values, id: questionNumerical.id });
    } else {
      createQuestionNumerical(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionAnswerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Answer Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionAnswers?.questionAnswers.map((questionAnswer) => (
                      <SelectItem key={questionAnswer.questionAnswer.id} value={questionAnswer.questionAnswer.id.toString()}>
                        {questionAnswer.questionAnswer.id}  {/* TODO: Replace with a field from the questionAnswer model */}
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
          name="tolerance"
          render={({ field }) => (<FormItem>
              <FormLabel>Tolerance</FormLabel>
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
            onClick={() => deleteQuestionNumerical({ id: questionNumerical.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionNumericalForm;
