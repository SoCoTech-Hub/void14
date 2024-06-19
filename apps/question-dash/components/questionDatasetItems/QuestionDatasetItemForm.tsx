"use client";

import { QuestionDatasetItem, NewQuestionDatasetItemParams, insertQuestionDatasetItemParams } from "@/lib/db/schema/questionDatasetItems";
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

const QuestionDatasetItemForm = ({
  questionDatasetItem,
  closeModal,
}: {
  questionDatasetItem?: QuestionDatasetItem;
  closeModal?: () => void;
}) => {
  const { data: questionDatasetDefinitions } = trpc.questionDatasetDefinitions.getQuestionDatasetDefinitions.useQuery();
  const editing = !!questionDatasetItem?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionDatasetItemParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionDatasetItemParams),
    defaultValues: questionDatasetItem ?? {
      questionDatasetDefinitionId: "",
     itemNumber: 0,
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

    await utils.questionDatasetItems.getQuestionDatasetItems.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Dataset Item ${action}d!`);
  };

  const { mutate: createQuestionDatasetItem, isLoading: isCreating } =
    trpc.questionDatasetItems.createQuestionDatasetItem.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionDatasetItem, isLoading: isUpdating } =
    trpc.questionDatasetItems.updateQuestionDatasetItem.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionDatasetItem, isLoading: isDeleting } =
    trpc.questionDatasetItems.deleteQuestionDatasetItem.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionDatasetItemParams) => {
    if (editing) {
      updateQuestionDatasetItem({ ...values, id: questionDatasetItem.id });
    } else {
      createQuestionDatasetItem(values);
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
          name="itemNumber"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Number</FormLabel>
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
            onClick={() => deleteQuestionDatasetItem({ id: questionDatasetItem.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionDatasetItemForm;
