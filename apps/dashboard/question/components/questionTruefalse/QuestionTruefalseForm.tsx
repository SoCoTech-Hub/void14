"use client";

import { QuestionTruefalse, NewQuestionTruefalseParams, insertQuestionTruefalseParams } from "@soco/question-db/schema/questionTruefalse";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuestionTruefalseForm = ({
  questionTruefalse,
  closeModal,
}: {
  questionTruefalse?: QuestionTruefalse;
  closeModal?: () => void;
}) => {
  const { data: questionAnswers } = trpc.questionAnswers.getQuestionAnswers.useQuery();
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const { data: questionAnswers } = trpc.questionAnswers.getQuestionAnswers.useQuery();
  const editing = !!questionTruefalse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionTruefalseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionTruefalseParams),
    defaultValues: questionTruefalse ?? {
      questionAnswerId: "",
     questionId: "",
     questionAnswerId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionTruefalse.getQuestionTruefalse.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Truefalse ${action}d!`);
  };

  const { mutate: createQuestionTruefalse, isLoading: isCreating } =
    trpc.questionTruefalse.createQuestionTruefalse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionTruefalse, isLoading: isUpdating } =
    trpc.questionTruefalse.updateQuestionTruefalse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionTruefalse, isLoading: isDeleting } =
    trpc.questionTruefalse.deleteQuestionTruefalse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionTruefalseParams) => {
    if (editing) {
      updateQuestionTruefalse({ ...values, id: questionTruefalse.id });
    } else {
      createQuestionTruefalse(values);
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
            onClick={() => deleteQuestionTruefalse({ id: questionTruefalse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionTruefalseForm;
