"use client";

import { ForumPost, NewForumPostParams, insertForumPostParams } from "@/lib/db/schema/forumPosts";
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

const ForumPostForm = ({
  forumPost,
  closeModal,
}: {
  forumPost?: ForumPost;
  closeModal?: () => void;
}) => {
  
  const editing = !!forumPost?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumPostParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumPostParams),
    defaultValues: forumPost ?? {
      attachment: "",
     charCount: 0,
     deleted: false,
     discussion: "",
     mailed: false,
     mailNow: 0,
     message: "",
     messageFormat: 0,
     messageTrust: false,
     parent: 0,
     privateReplyTo: "",
     subject: "",
     totalScore: 0,
     wordCount: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.forumPosts.getForumPosts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Post ${action}d!`);
  };

  const { mutate: createForumPost, isLoading: isCreating } =
    trpc.forumPosts.createForumPost.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumPost, isLoading: isUpdating } =
    trpc.forumPosts.updateForumPost.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumPost, isLoading: isDeleting } =
    trpc.forumPosts.deleteForumPost.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumPostParams) => {
    if (editing) {
      updateForumPost({ ...values, id: forumPost.id });
    } else {
      createForumPost(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (<FormItem>
              <FormLabel>Attachment</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="charCount"
          render={({ field }) => (<FormItem>
              <FormLabel>Char Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deleted"
          render={({ field }) => (<FormItem>
              <FormLabel>Deleted</FormLabel>
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
          name="mailed"
          render={({ field }) => (<FormItem>
              <FormLabel>Mailed</FormLabel>
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
          name="mailNow"
          render={({ field }) => (<FormItem>
              <FormLabel>Mail Now</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (<FormItem>
              <FormLabel>Message</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="messageFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Message Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="messageTrust"
          render={({ field }) => (<FormItem>
              <FormLabel>Message Trust</FormLabel>
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
          name="parent"
          render={({ field }) => (<FormItem>
              <FormLabel>Parent</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privateReplyTo"
          render={({ field }) => (<FormItem>
              <FormLabel>Private Reply To</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (<FormItem>
              <FormLabel>Subject</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalScore"
          render={({ field }) => (<FormItem>
              <FormLabel>Total Score</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wordCount"
          render={({ field }) => (<FormItem>
              <FormLabel>Word Count</FormLabel>
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
            onClick={() => deleteForumPost({ id: forumPost.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumPostForm;
