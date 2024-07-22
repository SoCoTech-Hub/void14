"use client";

import { QuestionMultianswer, NewQuestionMultianswerParams, insertQuestionMultianswerParams } from "@soco/question-db/schema/questionMultianswers";
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

const QuestionMultianswerForm = ({
  questionMultianswer,
  closeModal,
}: {
  questionMultianswer?: QuestionMultianswer;
  closeModal?: () => void;
}) => {
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionMultianswer?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionMultianswerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionMultianswerParams),
    defaultValues: questionMultianswer ?? {
      questionId: "",
     sequence: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionMultianswers.getQuestionMultianswers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Multianswer ${action}d!`);
  };

  const { mutate: createQuestionMultianswer, isLoading: isCreating } =
    trpc.questionMultianswers.createQuestionMultianswer.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionMultianswer, isLoading: isUpdating } =
    trpc.questionMultianswers.updateQuestionMultianswer.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionMultianswer, isLoading: isDeleting } =
    trpc.questionMultianswers.deleteQuestionMultianswer.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionMultianswerParams) => {
    if (editing) {
      updateQuestionMultianswer({ ...values, id: questionMultianswer.id });
    } else {
      createQuestionMultianswer(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="sequence"
          render={({ field }) => (<FormItem>
              <FormLabel>Sequence</FormLabel>
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
            onClick={() => deleteQuestionMultianswer({ id: questionMultianswer.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionMultianswerForm;
