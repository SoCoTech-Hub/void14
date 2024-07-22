"use client";

import { QuestionNumericalUnit, NewQuestionNumericalUnitParams, insertQuestionNumericalUnitParams } from "@soco/question-db/schema/questionNumericalUnits";
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

const QuestionNumericalUnitForm = ({
  questionNumericalUnit,
  closeModal,
}: {
  questionNumericalUnit?: QuestionNumericalUnit;
  closeModal?: () => void;
}) => {
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionNumericalUnit?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionNumericalUnitParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionNumericalUnitParams),
    defaultValues: questionNumericalUnit ?? {
      multiplier: 0.0,
     questionId: "",
     unit: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionNumericalUnits.getQuestionNumericalUnits.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Numerical Unit ${action}d!`);
  };

  const { mutate: createQuestionNumericalUnit, isLoading: isCreating } =
    trpc.questionNumericalUnits.createQuestionNumericalUnit.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionNumericalUnit, isLoading: isUpdating } =
    trpc.questionNumericalUnits.updateQuestionNumericalUnit.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionNumericalUnit, isLoading: isDeleting } =
    trpc.questionNumericalUnits.deleteQuestionNumericalUnit.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionNumericalUnitParams) => {
    if (editing) {
      updateQuestionNumericalUnit({ ...values, id: questionNumericalUnit.id });
    } else {
      createQuestionNumericalUnit(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="multiplier"
          render={({ field }) => (<FormItem>
              <FormLabel>Multiplier</FormLabel>
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
          name="unit"
          render={({ field }) => (<FormItem>
              <FormLabel>Unit</FormLabel>
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
            onClick={() => deleteQuestionNumericalUnit({ id: questionNumericalUnit.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionNumericalUnitForm;
