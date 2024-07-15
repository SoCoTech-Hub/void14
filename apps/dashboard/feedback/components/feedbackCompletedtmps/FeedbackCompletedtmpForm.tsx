"use client";

import { FeedbackCompletedtmp, NewFeedbackCompletedtmpParams, insertFeedbackCompletedtmpParams } from "@soco/feedback-db/schema/feedbackCompletedtmps";
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

const FeedbackCompletedtmpForm = ({
  feedbackCompletedtmp,
  closeModal,
}: {
  feedbackCompletedtmp?: FeedbackCompletedtmp;
  closeModal?: () => void;
}) => {
  
  const editing = !!feedbackCompletedtmp?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFeedbackCompletedtmpParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedbackCompletedtmpParams),
    defaultValues: feedbackCompletedtmp ?? {
      anonymousResponse: false,
     courseId: "",
     feedback: "",
     guestId: "",
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

    await utils.feedbackCompletedtmps.getFeedbackCompletedtmps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Feedback Completedtmp ${action}d!`);
  };

  const { mutate: createFeedbackCompletedtmp, isLoading: isCreating } =
    trpc.feedbackCompletedtmps.createFeedbackCompletedtmp.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFeedbackCompletedtmp, isLoading: isUpdating } =
    trpc.feedbackCompletedtmps.updateFeedbackCompletedtmp.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFeedbackCompletedtmp, isLoading: isDeleting } =
    trpc.feedbackCompletedtmps.deleteFeedbackCompletedtmp.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFeedbackCompletedtmpParams) => {
    if (editing) {
      updateFeedbackCompletedtmp({ ...values, id: feedbackCompletedtmp.id });
    } else {
      createFeedbackCompletedtmp(values);
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
          name="guestId"
          render={({ field }) => (<FormItem>
              <FormLabel>Guest Id</FormLabel>
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
            onClick={() => deleteFeedbackCompletedtmp({ id: feedbackCompletedtmp.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeedbackCompletedtmpForm;
