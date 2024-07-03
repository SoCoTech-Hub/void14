"use client";

import { FeedbackValue, NewFeedbackValueParams, insertFeedbackValueParams } from "@/lib/db/schema/feedbackValues";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FeedbackValueForm = ({
  feedbackValue,
  closeModal,
}: {
  feedbackValue?: FeedbackValue;
  closeModal?: () => void;
}) => {
  
  const editing = !!feedbackValue?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFeedbackValueParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedbackValueParams),
    defaultValues: feedbackValue ?? {
      completed: "",
     courseId: "",
     item: "",
     tmpCompleted: "",
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

    await utils.feedbackValues.getFeedbackValues.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Feedback Value ${action}d!`);
  };

  const { mutate: createFeedbackValue, isLoading: isCreating } =
    trpc.feedbackValues.createFeedbackValue.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFeedbackValue, isLoading: isUpdating } =
    trpc.feedbackValues.updateFeedbackValue.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFeedbackValue, isLoading: isDeleting } =
    trpc.feedbackValues.deleteFeedbackValue.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFeedbackValueParams) => {
    if (editing) {
      updateFeedbackValue({ ...values, id: feedbackValue.id });
    } else {
      createFeedbackValue(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (<FormItem>
              <FormLabel>Completed</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (<FormItem>
              <FormLabel>Item</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tmpCompleted"
          render={({ field }) => (<FormItem>
              <FormLabel>Tmp Completed</FormLabel>
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
            onClick={() => deleteFeedbackValue({ id: feedbackValue.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeedbackValueForm;
