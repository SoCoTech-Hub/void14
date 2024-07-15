"use client";

import { ToolCustomLangComponent, NewToolCustomLangComponentParams, insertToolCustomLangComponentParams } from "@soco/tool-custom-lang-db/schema/toolCustomLangComponents";
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

const ToolCustomLangComponentForm = ({
  toolCustomLangComponent,
  closeModal,
}: {
  toolCustomLangComponent?: ToolCustomLangComponent;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolCustomLangComponent?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolCustomLangComponentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolCustomLangComponentParams),
    defaultValues: toolCustomLangComponent ?? {
      name: "",
     version: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolCustomLangComponents.getToolCustomLangComponents.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Custom Lang Component ${action}d!`);
  };

  const { mutate: createToolCustomLangComponent, isLoading: isCreating } =
    trpc.toolCustomLangComponents.createToolCustomLangComponent.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolCustomLangComponent, isLoading: isUpdating } =
    trpc.toolCustomLangComponents.updateToolCustomLangComponent.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolCustomLangComponent, isLoading: isDeleting } =
    trpc.toolCustomLangComponents.deleteToolCustomLangComponent.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolCustomLangComponentParams) => {
    if (editing) {
      updateToolCustomLangComponent({ ...values, id: toolCustomLangComponent.id });
    } else {
      createToolCustomLangComponent(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (<FormItem>
              <FormLabel>Version</FormLabel>
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
            onClick={() => deleteToolCustomLangComponent({ id: toolCustomLangComponent.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolCustomLangComponentForm;
