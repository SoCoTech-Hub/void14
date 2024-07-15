"use client";

import { FeedbackSitecourseMap, NewFeedbackSitecourseMapParams, insertFeedbackSitecourseMapParams } from "@soco/feedback-db/schema/feedbackSitecourseMaps";
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

const FeedbackSitecourseMapForm = ({
  feedbackSitecourseMap,
  closeModal,
}: {
  feedbackSitecourseMap?: FeedbackSitecourseMap;
  closeModal?: () => void;
}) => {
  const { data: feedbacks } = trpc.feedbacks.getFeedbacks.useQuery();
  const editing = !!feedbackSitecourseMap?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFeedbackSitecourseMapParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeedbackSitecourseMapParams),
    defaultValues: feedbackSitecourseMap ?? {
      courseId: "",
     feedbackId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.feedbackSitecourseMaps.getFeedbackSitecourseMaps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Feedback Sitecourse Map ${action}d!`);
  };

  const { mutate: createFeedbackSitecourseMap, isLoading: isCreating } =
    trpc.feedbackSitecourseMaps.createFeedbackSitecourseMap.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFeedbackSitecourseMap, isLoading: isUpdating } =
    trpc.feedbackSitecourseMaps.updateFeedbackSitecourseMap.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFeedbackSitecourseMap, isLoading: isDeleting } =
    trpc.feedbackSitecourseMaps.deleteFeedbackSitecourseMap.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFeedbackSitecourseMapParams) => {
    if (editing) {
      updateFeedbackSitecourseMap({ ...values, id: feedbackSitecourseMap.id });
    } else {
      createFeedbackSitecourseMap(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="feedbackId"
          render={({ field }) => (<FormItem>
              <FormLabel>Feedback Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a feedback" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbacks?.feedbacks.map((feedback) => (
                      <SelectItem key={feedback.id} value={feedback.id.toString()}>
                        {feedback.id}  {/* TODO: Replace with a field from the feedback model */}
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
            onClick={() => deleteFeedbackSitecourseMap({ id: feedbackSitecourseMap.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FeedbackSitecourseMapForm;
