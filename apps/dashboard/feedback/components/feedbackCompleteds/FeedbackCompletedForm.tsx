"use client";

import { FeedbackCompleted, NewFeedbackCompletedParams, insertFeedbackCompletedParams } from "@soco/feedback-db/schema/feedbackCompleteds";
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
import { Checkbox } from "@soco/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FeedbackCompletedForm = ({
  feedbackCompleted,
  closeModal,
}: {
  feedbackCompleted?: FeedbackCompleted;
  closeModal?: () => void;
}) => {
  
  const editing = !!feedbackCompleted?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFeedbackCompletedParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedbackCompletedParams),
    defaultValues: feedbackCompleted ?? {
      anonymousResponse: false,
     courseId: "",
     feedback: "",
     randomResponse: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.feedbackCompleteds.getFeedbackCompleteds.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Feedback Completed ${action}d!`);
  };

  const { mutate: createFeedbackCompleted, isLoading: isCreating } =
    trpc.feedbackCompleteds.createFeedbackCompleted.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFeedbackCompleted, isLoading: isUpdating } =
    trpc.feedbackCompleteds.updateFeedbackCompleted.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFeedbackCompleted, isLoading: isDeleting } =
    trpc.feedbackCompleteds.deleteFeedbackCompleted.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFeedbackCompletedParams) => {
    if (editing) {
      updateFeedbackCompleted({ ...values, id: feedbackCompleted.id });
    } else {
      createFeedbackCompleted(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="anonymousResponse"
          render={({ field }) => (<FormItem>
              <FormLabel>Anonymous Response</FormLabel>
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
          name="feedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Feedback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="randomResponse"
          render={({ field }) => (<FormItem>
              <FormLabel>Random Response</FormLabel>
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
            onClick={() => deleteFeedbackCompleted({ id: feedbackCompleted.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeedbackCompletedForm;
