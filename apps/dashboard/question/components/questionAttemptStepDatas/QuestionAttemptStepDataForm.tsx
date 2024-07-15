"use client";

import { QuestionAttemptStepData, NewQuestionAttemptStepDataParams, insertQuestionAttemptStepDataParams } from "@soco/question-db/schema/questionAttemptStepDatas";
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

const QuestionAttemptStepDataForm = ({
  questionAttemptStepData,
  closeModal,
}: {
  questionAttemptStepData?: QuestionAttemptStepData;
  closeModal?: () => void;
}) => {
  const { data: questionAttemptSteps } = trpc.questionAttemptSteps.getQuestionAttemptSteps.useQuery();
  const editing = !!questionAttemptStepData?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionAttemptStepDataParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionAttemptStepDataParams),
    defaultValues: questionAttemptStepData ?? {
      questionAttemptStepId: "",
     name: "",
     value: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionAttemptStepDatas.getQuestionAttemptStepDatas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Attempt Step Data ${action}d!`);
  };

  const { mutate: createQuestionAttemptStepData, isLoading: isCreating } =
    trpc.questionAttemptStepDatas.createQuestionAttemptStepData.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionAttemptStepData, isLoading: isUpdating } =
    trpc.questionAttemptStepDatas.updateQuestionAttemptStepData.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionAttemptStepData, isLoading: isDeleting } =
    trpc.questionAttemptStepDatas.deleteQuestionAttemptStepData.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionAttemptStepDataParams) => {
    if (editing) {
      updateQuestionAttemptStepData({ ...values, id: questionAttemptStepData.id });
    } else {
      createQuestionAttemptStepData(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionAttemptStepId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Attempt Step Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question attempt step" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionAttemptSteps?.questionAttemptSteps.map((questionAttemptStep) => (
                      <SelectItem key={questionAttemptStep.questionAttemptStep.id} value={questionAttemptStep.questionAttemptStep.id.toString()}>
                        {questionAttemptStep.questionAttemptStep.id}  {/* TODO: Replace with a field from the questionAttemptStep model */}
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
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
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
            onClick={() => deleteQuestionAttemptStepData({ id: questionAttemptStepData.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionAttemptStepDataForm;
