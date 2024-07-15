"use client";

import { QuestionBankEntry, NewQuestionBankEntryParams, insertQuestionBankEntryParams } from "@soco/question-db/schema/questionBankEntries";
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

const QuestionBankEntryForm = ({
  questionBankEntry,
  closeModal,
}: {
  questionBankEntry?: QuestionBankEntry;
  closeModal?: () => void;
}) => {
  const { data: questionCategories } = trpc.questionCategories.getQuestionCategories.useQuery();
  const editing = !!questionBankEntry?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionBankEntryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionBankEntryParams),
    defaultValues: questionBankEntry ?? {
      idNumber: "",
     questionCategoryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionBankEntries.getQuestionBankEntries.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Bank Entry ${action}d!`);
  };

  const { mutate: createQuestionBankEntry, isLoading: isCreating } =
    trpc.questionBankEntries.createQuestionBankEntry.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionBankEntry, isLoading: isUpdating } =
    trpc.questionBankEntries.updateQuestionBankEntry.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionBankEntry, isLoading: isDeleting } =
    trpc.questionBankEntries.deleteQuestionBankEntry.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionBankEntryParams) => {
    if (editing) {
      updateQuestionBankEntry({ ...values, id: questionBankEntry.id });
    } else {
      createQuestionBankEntry(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (<FormItem>
              <FormLabel>Id Number</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question category" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionCategories?.questionCategories.map((questionCategory) => (
                      <SelectItem key={questionCategory.id} value={questionCategory.id.toString()}>
                        {questionCategory.id}  {/* TODO: Replace with a field from the questionCategory model */}
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
            onClick={() => deleteQuestionBankEntry({ id: questionBankEntry.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionBankEntryForm;
