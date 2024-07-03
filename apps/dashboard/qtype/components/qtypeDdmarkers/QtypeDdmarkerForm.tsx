"use client";

import { QtypeDdmarker, NewQtypeDdmarkerParams, insertQtypeDdmarkerParams } from "@/lib/db/schema/qtypeDdmarkers";
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

const QtypeDdmarkerForm = ({
  qtypeDdmarker,
  closeModal,
}: {
  qtypeDdmarker?: QtypeDdmarker;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeDdmarker?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeDdmarkerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeDdmarkerParams),
    defaultValues: qtypeDdmarker ?? {
      correctFeedback: "",
     correctFeedbackFormat: 0,
     incorrectFeedback: "",
     incorrectFeedbackFormat: 0,
     partiallyCorrectFeedback: "",
     partiallyCorrectFeedbackFormat: 0,
     questionId: "",
     showMisplaced: false,
     showNumCorrect: false,
     shuffleAnswers: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeDdmarkers.getQtypeDdmarkers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Ddmarker ${action}d!`);
  };

  const { mutate: createQtypeDdmarker, isLoading: isCreating } =
    trpc.qtypeDdmarkers.createQtypeDdmarker.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeDdmarker, isLoading: isUpdating } =
    trpc.qtypeDdmarkers.updateQtypeDdmarker.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeDdmarker, isLoading: isDeleting } =
    trpc.qtypeDdmarkers.deleteQtypeDdmarker.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeDdmarkerParams) => {
    if (editing) {
      updateQtypeDdmarker({ ...values, id: qtypeDdmarker.id });
    } else {
      createQtypeDdmarker(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="showMisplaced"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Misplaced</FormLabel>
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
            onClick={() => deleteQtypeDdmarker({ id: qtypeDdmarker.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeDdmarkerForm;
