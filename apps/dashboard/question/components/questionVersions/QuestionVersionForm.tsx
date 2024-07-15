"use client";

import { QuestionVersion, NewQuestionVersionParams, insertQuestionVersionParams } from "@soco/question-db/schema/questionVersions";
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

const QuestionVersionForm = ({
  questionVersion,
  closeModal,
}: {
  questionVersion?: QuestionVersion;
  closeModal?: () => void;
}) => {
  const { data: questionBankEntries } = trpc.questionBankEntries.getQuestionBankEntries.useQuery();
  const { data: questions } = trpc.questions.getQuestions.useQuery();
  const editing = !!questionVersion?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionVersionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionVersionParams),
    defaultValues: questionVersion ?? {
      questionBankEntryId: "",
     questionId: "",
     status: "",
     version: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionVersions.getQuestionVersions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Version ${action}d!`);
  };

  const { mutate: createQuestionVersion, isLoading: isCreating } =
    trpc.questionVersions.createQuestionVersion.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionVersion, isLoading: isUpdating } =
    trpc.questionVersions.updateQuestionVersion.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionVersion, isLoading: isDeleting } =
    trpc.questionVersions.deleteQuestionVersion.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionVersionParams) => {
    if (editing) {
      updateQuestionVersion({ ...values, id: questionVersion.id });
    } else {
      createQuestionVersion(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionBankEntryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Bank Entry Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question bank entry" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionBankEntries?.questionBankEntries.map((questionBankEntry) => (
                      <SelectItem key={questionBankEntry.questionBankEntry.id} value={questionBankEntry.questionBankEntry.id.toString()}>
                        {questionBankEntry.questionBankEntry.id}  {/* TODO: Replace with a field from the questionBankEntry model */}
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
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (<FormItem>
              <FormLabel>Version</FormLabel>
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
            onClick={() => deleteQuestionVersion({ id: questionVersion.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionVersionForm;
