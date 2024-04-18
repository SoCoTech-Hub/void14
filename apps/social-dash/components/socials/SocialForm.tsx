"use client";

import { Social, NewSocialParams, insertSocialParams } from "@/lib/db/schema/socials";
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

const SocialForm = ({
  social,
  closeModal,
}: {
  social?: Social;
  closeModal?: () => void;
}) => {
  const { data: socialEmoji } = trpc.socialEmojis.getSocialEmojis.useQuery();
  const editing = !!social?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSocialParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSocialParams),
    defaultValues: social ?? {
      tableName: "",
     fieldId: "",
     socialEmojiId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.socials.getSocials.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Social ${action}d!`);
  };

  const { mutate: createSocial, isLoading: isCreating } =
    trpc.socials.createSocial.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSocial, isLoading: isUpdating } =
    trpc.socials.updateSocial.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSocial, isLoading: isDeleting } =
    trpc.socials.deleteSocial.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSocialParams) => {
    if (editing) {
      updateSocial({ ...values, id: social.id });
    } else {
      createSocial(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="tableName"
          render={({ field }) => (<FormItem>
              <FormLabel>Table Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fieldId"
          render={({ field }) => (<FormItem>
              <FormLabel>Field Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialEmojiId"
          render={({ field }) => (<FormItem>
              <FormLabel>Social Emoji Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a social emoji" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialEmoji?.socialEmojis.map((socialEmojis) => (
                      <SelectItem key={socialEmojis.id} value={socialEmojis.id.toString()}>
                        {socialEmojis.name}  {/* TODO: Replace with a field from the socialEmoji model */}
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
            onClick={() => deleteSocial({ id: social.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SocialForm;
