"use client";

import { FeedbackValuetmp, NewFeedbackValuetmpParams, insertFeedbackValuetmpParams } from "@soco/feedback-db/schema/feedbackValuetmps";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FeedbackValuetmpForm = ({
  feedbackValuetmp,
  closeModal,
}: {
  feedbackValuetmp?: FeedbackValuetmp;
  closeModal?: () => void;
}) => {
  
  const editing = !!feedbackValuetmp?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFeedbackValuetmpParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedbackValuetmpParams),
    defaultValues: feedbackValuetmp ?? {
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

    await utils.feedbackValuetmps.getFeedbackValuetmps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Feedback Valuetmp ${action}d!`);
  };

  const { mutate: createFeedbackValuetmp, isLoading: isCreating } =
    trpc.feedbackValuetmps.createFeedbackValuetmp.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFeedbackValuetmp, isLoading: isUpdating } =
    trpc.feedbackValuetmps.updateFeedbackValuetmp.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFeedbackValuetmp, isLoading: isDeleting } =
    trpc.feedbackValuetmps.deleteFeedbackValuetmp.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFeedbackValuetmpParams) => {
    if (editing) {
      updateFeedbackValuetmp({ ...values, id: feedbackValuetmp.id });
    } else {
      createFeedbackValuetmp(values);
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
            onClick={() => deleteFeedbackValuetmp({ id: feedbackValuetmp.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeedbackValuetmpForm;
