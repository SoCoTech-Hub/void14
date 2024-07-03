"use client";

import { QuestionCalculatedOption, NewQuestionCalculatedOptionParams, insertQuestionCalculatedOptionParams } from "@/lib/db/schema/questionCalculatedOptions";
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

const QuestionCalculatedOptionForm = ({
  questionCalculatedOption,
  closeModal,
}: {
  questionCalculatedOption?: QuestionCalculatedOption;
  closeModal?: () => void;
}) => {
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionCalculatedOption?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionCalculatedOptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionCalculatedOptionParams),
    defaultValues: questionCalculatedOption ?? {
      answerNumbering: "",
     correctFeedback: "",
     correctFeedbackFormat: 0,
     incorrectFeedback: "",
     incorrectFeedbackFormat: 0,
     partiallycorrectFeedback: "",
     partiallycorrectFeedbackFormat: 0,
     questionId: "",
     showNumCorrect: false,
     shuffleAnswers: false,
     single: false,
     synchronize: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionCalculatedOptions.getQuestionCalculatedOptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Calculated Option ${action}d!`);
  };

  const { mutate: createQuestionCalculatedOption, isLoading: isCreating } =
    trpc.questionCalculatedOptions.createQuestionCalculatedOption.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionCalculatedOption, isLoading: isUpdating } =
    trpc.questionCalculatedOptions.updateQuestionCalculatedOption.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionCalculatedOption, isLoading: isDeleting } =
    trpc.questionCalculatedOptions.deleteQuestionCalculatedOption.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionCalculatedOptionParams) => {
    if (editing) {
      updateQuestionCalculatedOption({ ...values, id: questionCalculatedOption.id });
    } else {
      createQuestionCalculatedOption(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="answerNumbering"
          render={({ field }) => (<FormItem>
              <FormLabel>Answer Numbering</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="correctFeedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Correct Feedback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="correctFeedbackFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Correct Feedback Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incorrectFeedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Incorrect Feedback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incorrectFeedbackFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Incorrect Feedback Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partiallycorrectFeedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Partiallycorrect Feedback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partiallycorrectFeedbackFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Partiallycorrect Feedback Format</FormLabel>
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
          name="showNumCorrect"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Num Correct</FormLabel>
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
          name="shuffleAnswers"
          render={({ field }) => (<FormItem>
              <FormLabel>Shuffle Answers</FormLabel>
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
          name="single"
          render={({ field }) => (<FormItem>
              <FormLabel>Single</FormLabel>
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
          name="synchronize"
          render={({ field }) => (<FormItem>
              <FormLabel>Synchronize</FormLabel>
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
            onClick={() => deleteQuestionCalculatedOption({ id: questionCalculatedOption.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionCalculatedOptionForm;
