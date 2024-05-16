"use client";

import { WikiSubwiki, NewWikiSubwikiParams, insertWikiSubwikiParams } from "@/lib/db/schema/wikiSubwikis";
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

const WikiSubwikiForm = ({
  wikiSubwiki,
  closeModal,
}: {
  wikiSubwiki?: WikiSubwiki;
  closeModal?: () => void;
}) => {
  const { data: wikis } = trpc.wikis.getWikis.useQuery();
  const editing = !!wikiSubwiki?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertWikiSubwikiParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertWikiSubwikiParams),
    defaultValues: wikiSubwiki ?? {
      groupId: "",
     wikiId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.wikiSubwikis.getWikiSubwikis.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Wiki Subwiki ${action}d!`);
  };

  const { mutate: createWikiSubwiki, isLoading: isCreating } =
    trpc.wikiSubwikis.createWikiSubwiki.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateWikiSubwiki, isLoading: isUpdating } =
    trpc.wikiSubwikis.updateWikiSubwiki.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteWikiSubwiki, isLoading: isDeleting } =
    trpc.wikiSubwikis.deleteWikiSubwiki.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewWikiSubwikiParams) => {
    if (editing) {
      updateWikiSubwiki({ ...values, id: wikiSubwiki.id });
    } else {
      createWikiSubwiki(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (<FormItem>
              <FormLabel>Group Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wikiId"
          render={({ field }) => (<FormItem>
              <FormLabel>Wiki Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a wiki" />
                  </SelectTrigger>
                  <SelectContent>
                    {wikis?.wikis.map((wiki) => (
                      <SelectItem key={wiki.id} value={wiki.id.toString()}>
                        {wiki.id}  {/* TODO: Replace with a field from the wiki model */}
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
            onClick={() => deleteWikiSubwiki({ id: wikiSubwiki.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default WikiSubwikiForm;
