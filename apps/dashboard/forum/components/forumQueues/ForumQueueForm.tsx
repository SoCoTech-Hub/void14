"use client";

import { ForumQueue, NewForumQueueParams, insertForumQueueParams } from "@soco/forum-db/schema/forumQueues";
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

const ForumQueueForm = ({
  forumQueue,
  closeModal,
}: {
  forumQueue?: ForumQueue;
  closeModal?: () => void;
}) => {
  
  const editing = !!forumQueue?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumQueueParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumQueueParams),
    defaultValues: forumQueue ?? {
      discussionId: "",
     postId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.forumQueues.getForumQueues.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Queue ${action}d!`);
  };

  const { mutate: createForumQueue, isLoading: isCreating } =
    trpc.forumQueues.createForumQueue.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumQueue, isLoading: isUpdating } =
    trpc.forumQueues.updateForumQueue.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumQueue, isLoading: isDeleting } =
    trpc.forumQueues.deleteForumQueue.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumQueueParams) => {
    if (editing) {
      updateForumQueue({ ...values, id: forumQueue.id });
    } else {
      createForumQueue(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="discussionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Discussion Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postId"
          render={({ field }) => (<FormItem>
              <FormLabel>Post Id</FormLabel>
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
            onClick={() => deleteForumQueue({ id: forumQueue.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumQueueForm;
