"use client";

import { QtypeMultichoiceOption, NewQtypeMultichoiceOptionParams, insertQtypeMultichoiceOptionParams } from "@soco/qtype-db/schema/qtypeMultichoiceOptions";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QtypeMultichoiceOptionForm = ({
  qtypeMultichoiceOption,
  closeModal,
}: {
  qtypeMultichoiceOption?: QtypeMultichoiceOption;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeMultichoiceOption?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeMultichoiceOptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeMultichoiceOptionParams),
    defaultValues: qtypeMultichoiceOption ?? {
      answerNumbering: "",
     correctFeedback: "",
     correctFeedbackFormat: 0,
     incorrectFeedback: "",
     incorrectFeedbackFormat: 0,
     partiallyCorrectFeedback: "",
     partiallyCorrectFeedbackFormat: 0,
     questionId: "",
     showNumCorrect: false,
     showStandardInstruction: false,
     shuffleAnswers: false,
     single: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeMultichoiceOptions.getQtypeMultichoiceOptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Multichoice Option ${action}d!`);
  };

  const { mutate: createQtypeMultichoiceOption, isLoading: isCreating } =
    trpc.qtypeMultichoiceOptions.createQtypeMultichoiceOption.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeMultichoiceOption, isLoading: isUpdating } =
    trpc.qtypeMultichoiceOptions.updateQtypeMultichoiceOption.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeMultichoiceOption, isLoading: isDeleting } =
    trpc.qtypeMultichoiceOptions.deleteQtypeMultichoiceOption.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeMultichoiceOptionParams) => {
    if (editing) {
      updateQtypeMultichoiceOption({ ...values, id: qtypeMultichoiceOption.id });
    } else {
      createQtypeMultichoiceOption(values);
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
          name="partiallyCorrectFeedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Partially Correct Feedback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partiallyCorrectFeedbackFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Partially Correct Feedback Format</FormLabel>
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
            <Input {...field} />
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
          name="showStandardInstruction"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Standard Instruction</FormLabel>
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
            onClick={() => deleteQtypeMultichoiceOption({ id: qtypeMultichoiceOption.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeMultichoiceOptionForm;
