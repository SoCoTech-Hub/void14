"use client";

import { QuestionNumericalOption, NewQuestionNumericalOptionParams, insertQuestionNumericalOptionParams } from "@soco/question-db/schema/questionNumericalOptions";
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

const QuestionNumericalOptionForm = ({
  questionNumericalOption,
  closeModal,
}: {
  questionNumericalOption?: QuestionNumericalOption;
  closeModal?: () => void;
}) => {
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionNumericalOption?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionNumericalOptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionNumericalOptionParams),
    defaultValues: questionNumericalOption ?? {
      questionId: "",
     showUnits: 0,
     unitGradingType: 0,
     unitPenalty: 0.0,
     unitsLeft: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionNumericalOptions.getQuestionNumericalOptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Numerical Option ${action}d!`);
  };

  const { mutate: createQuestionNumericalOption, isLoading: isCreating } =
    trpc.questionNumericalOptions.createQuestionNumericalOption.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionNumericalOption, isLoading: isUpdating } =
    trpc.questionNumericalOptions.updateQuestionNumericalOption.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionNumericalOption, isLoading: isDeleting } =
    trpc.questionNumericalOptions.deleteQuestionNumericalOption.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionNumericalOptionParams) => {
    if (editing) {
      updateQuestionNumericalOption({ ...values, id: questionNumericalOption.id });
    } else {
      createQuestionNumericalOption(values);
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
          name="showUnits"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Units</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitGradingType"
          render={({ field }) => (<FormItem>
              <FormLabel>Unit Grading Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitPenalty"
          render={({ field }) => (<FormItem>
              <FormLabel>Unit Penalty</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitsLeft"
          render={({ field }) => (<FormItem>
              <FormLabel>Units Left</FormLabel>
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
            onClick={() => deleteQuestionNumericalOption({ id: questionNumericalOption.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionNumericalOptionForm;
