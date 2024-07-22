"use client";

import { SocialReaction, NewSocialReactionParams, insertSocialReactionParams } from "@soco/blog-db/schema/socialReactions";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SocialReactionForm = ({
  socialReaction,
  closeModal,
}: {
  socialReaction?: SocialReaction;
  closeModal?: () => void;
}) => {
  const { data: blogs } = trpc.blogs.getBlogs.useQuery();
  const { data: socialIcons } = trpc.socialIcons.getSocialIcons.useQuery();
  const editing = !!socialReaction?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSocialReactionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSocialReactionParams),
    defaultValues: socialReaction ?? {
      blogId: "",
     socialIconId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.socialReactions.getSocialReactions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Social Reaction ${action}d!`);
  };

  const { mutate: createSocialReaction, isLoading: isCreating } =
    trpc.socialReactions.createSocialReaction.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSocialReaction, isLoading: isUpdating } =
    trpc.socialReactions.updateSocialReaction.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSocialReaction, isLoading: isDeleting } =
    trpc.socialReactions.deleteSocialReaction.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSocialReactionParams) => {
    if (editing) {
      updateSocialReaction({ ...values, id: socialReaction.id });
    } else {
      createSocialReaction(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="blogId"
          render={({ field }) => (<FormItem>
              <FormLabel>Blog Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a blog" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogs?.blogs.map((blog) => (
                      <SelectItem key={blog.id} value={blog.id.toString()}>
                        {blog.id}  {/* TODO: Replace with a field from the blog model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialIconId"
          render={({ field }) => (<FormItem>
              <FormLabel>Social Icon Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a social icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialIcons?.socialIcons.map((socialIcon) => (
                      <SelectItem key={socialIcon.id} value={socialIcon.id.toString()}>
                        {socialIcon.id}  {/* TODO: Replace with a field from the socialIcon model */}
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
            onClick={() => deleteSocialReaction({ id: socialReaction.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SocialReactionForm;
