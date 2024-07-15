"use client";

import { QuestionDataset, NewQuestionDatasetParams, insertQuestionDatasetParams } from "@soco/question-db/schema/questionDatasets";
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

const QuestionDatasetForm = ({
  questionDataset,
  closeModal,
}: {
  questionDataset?: QuestionDataset;
  closeModal?: () => void;
}) => {
  const { data: questionDatasetDefinitions } = trpc.questionDatasetDefinitions.getQuestionDatasetDefinitions.useQuery();
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionDataset?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionDatasetParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionDatasetParams),
    defaultValues: questionDataset ?? {
      questionDatasetDefinitionId: "",
     questionId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionDatasets.getQuestionDatasets.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Dataset ${action}d!`);
  };

  const { mutate: createQuestionDataset, isLoading: isCreating } =
    trpc.questionDatasets.createQuestionDataset.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionDataset, isLoading: isUpdating } =
    trpc.questionDatasets.updateQuestionDataset.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionDataset, isLoading: isDeleting } =
    trpc.questionDatasets.deleteQuestionDataset.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionDatasetParams) => {
    if (editing) {
      updateQuestionDataset({ ...values, id: questionDataset.id });
    } else {
      createQuestionDataset(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionDatasetDefinitionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Dataset Definition Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question dataset definition" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionDatasetDefinitions?.questionDatasetDefinitions.map((questionDatasetDefinition) => (
                      <SelectItem key={questionDatasetDefinition.questionDatasetDefinition.id} value={questionDatasetDefinition.questionDatasetDefinition.id.toString()}>
                        {questionDatasetDefinition.questionDatasetDefinition.id}  {/* TODO: Replace with a field from the questionDatasetDefinition model */}
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
            onClick={() => deleteQuestionDataset({ id: questionDataset.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionDatasetForm;
