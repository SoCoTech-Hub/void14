"use client";

import { ForumDiscussionSub, NewForumDiscussionSubParams, insertForumDiscussionSubParams } from "@soco/forum-db/schema/forumDiscussionSubs";
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

const ForumDiscussionSubForm = ({
  forumDiscussionSub,
  closeModal,
}: {
  forumDiscussionSub?: ForumDiscussionSub;
  closeModal?: () => void;
}) => {
  
  const editing = !!forumDiscussionSub?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumDiscussionSubParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumDiscussionSubParams),
    defaultValues: forumDiscussionSub ?? {
      discussion: "",
     forum: "",
     preference: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.forumDiscussionSubs.getForumDiscussionSubs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Discussion Sub ${action}d!`);
  };

  const { mutate: createForumDiscussionSub, isLoading: isCreating } =
    trpc.forumDiscussionSubs.createForumDiscussionSub.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumDiscussionSub, isLoading: isUpdating } =
    trpc.forumDiscussionSubs.updateForumDiscussionSub.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumDiscussionSub, isLoading: isDeleting } =
    trpc.forumDiscussionSubs.deleteForumDiscussionSub.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumDiscussionSubParams) => {
    if (editing) {
      updateForumDiscussionSub({ ...values, id: forumDiscussionSub.id });
    } else {
      createForumDiscussionSub(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="discussion"
          render={({ field }) => (<FormItem>
              <FormLabel>Discussion</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="forum"
          render={({ field }) => (<FormItem>
              <FormLabel>Forum</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preference"
          render={({ field }) => (<FormItem>
              <FormLabel>Preference</FormLabel>
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
            onClick={() => deleteForumDiscussionSub({ id: forumDiscussionSub.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumDiscussionSubForm;
