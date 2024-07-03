"use client";

import { QuestionReference, NewQuestionReferenceParams, insertQuestionReferenceParams } from "@/lib/db/schema/questionReferences";
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

const QuestionReferenceForm = ({
  questionReference,
  closeModal,
}: {
  questionReference?: QuestionReference;
  closeModal?: () => void;
}) => {
  const { data: questionBankEntries } = trpc.questionBankEntries.getQuestionBankEntries.useQuery();
  const editing = !!questionReference?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionReferenceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionReferenceParams),
    defaultValues: questionReference ?? {
      component: "",
     itemId: "",
     questionArea: "",
     questionBankEntryId: "",
     usingContextId: "",
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

    await utils.questionReferences.getQuestionReferences.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Reference ${action}d!`);
  };

  const { mutate: createQuestionReference, isLoading: isCreating } =
    trpc.questionReferences.createQuestionReference.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionReference, isLoading: isUpdating } =
    trpc.questionReferences.updateQuestionReference.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionReference, isLoading: isDeleting } =
    trpc.questionReferences.deleteQuestionReference.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionReferenceParams) => {
    if (editing) {
      updateQuestionReference({ ...values, id: questionReference.id });
    } else {
      createQuestionReference(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="component"
          render={({ field }) => (<FormItem>
              <FormLabel>Component</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionArea"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Area</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="usingContextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Using Context Id</FormLabel>
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
            onClick={() => deleteQuestionReference({ id: questionReference.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionReferenceForm;
