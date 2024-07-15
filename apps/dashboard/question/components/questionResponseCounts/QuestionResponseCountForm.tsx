"use client";

import { QuestionResponseCount, NewQuestionResponseCountParams, insertQuestionResponseCountParams } from "@soco/question-db/schema/questionResponseCounts";
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

const QuestionResponseCountForm = ({
  questionResponseCount,
  closeModal,
}: {
  questionResponseCount?: QuestionResponseCount;
  closeModal?: () => void;
}) => {
  const { data: questionResponseAnalysises } = trpc.questionResponseAnalysises.getQuestionResponseAnalysises.useQuery();
  const editing = !!questionResponseCount?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionResponseCountParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionResponseCountParams),
    defaultValues: questionResponseCount ?? {
      questionResponseAnalysiseId: "",
     rcount: 0,
     try: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionResponseCounts.getQuestionResponseCounts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Response Count ${action}d!`);
  };

  const { mutate: createQuestionResponseCount, isLoading: isCreating } =
    trpc.questionResponseCounts.createQuestionResponseCount.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionResponseCount, isLoading: isUpdating } =
    trpc.questionResponseCounts.updateQuestionResponseCount.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionResponseCount, isLoading: isDeleting } =
    trpc.questionResponseCounts.deleteQuestionResponseCount.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionResponseCountParams) => {
    if (editing) {
      updateQuestionResponseCount({ ...values, id: questionResponseCount.id });
    } else {
      createQuestionResponseCount(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionResponseAnalysiseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Response Analysise Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question response analysise" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionResponseAnalysises?.questionResponseAnalysises.map((questionResponseAnalysise) => (
                      <SelectItem key={questionResponseAnalysise.questionResponseAnalysise.id} value={questionResponseAnalysise.questionResponseAnalysise.id.toString()}>
                        {questionResponseAnalysise.questionResponseAnalysise.id}  {/* TODO: Replace with a field from the questionResponseAnalysise model */}
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
          name="rcount"
          render={({ field }) => (<FormItem>
              <FormLabel>Rcount</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="try"
          render={({ field }) => (<FormItem>
              <FormLabel>Try</FormLabel>
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
            onClick={() => deleteQuestionResponseCount({ id: questionResponseCount.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionResponseCountForm;
