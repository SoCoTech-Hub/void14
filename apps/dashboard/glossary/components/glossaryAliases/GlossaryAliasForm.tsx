"use client";

import { GlossaryAlias, NewGlossaryAliasParams, insertGlossaryAliasParams } from "@/lib/db/schema/glossaryAliases";
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

const GlossaryAliasForm = ({
  glossaryAlias,
  closeModal,
}: {
  glossaryAlias?: GlossaryAlias;
  closeModal?: () => void;
}) => {
  
  const editing = !!glossaryAlias?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGlossaryAliasParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGlossaryAliasParams),
    defaultValues: glossaryAlias ?? {
      alias: "",
     entryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.glossaryAliases.getGlossaryAliases.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Glossary Alias ${action}d!`);
  };

  const { mutate: createGlossaryAlias, isLoading: isCreating } =
    trpc.glossaryAliases.createGlossaryAlias.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGlossaryAlias, isLoading: isUpdating } =
    trpc.glossaryAliases.updateGlossaryAlias.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGlossaryAlias, isLoading: isDeleting } =
    trpc.glossaryAliases.deleteGlossaryAlias.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGlossaryAliasParams) => {
    if (editing) {
      updateGlossaryAlias({ ...values, id: glossaryAlias.id });
    } else {
      createGlossaryAlias(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (<FormItem>
              <FormLabel>Alias</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Entry Id</FormLabel>
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
            onClick={() => deleteGlossaryAlias({ id: glossaryAlias.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GlossaryAliasForm;
