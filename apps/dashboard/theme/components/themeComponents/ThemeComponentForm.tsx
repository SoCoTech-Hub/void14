"use client";

import { ThemeComponent, NewThemeComponentParams, insertThemeComponentParams } from "@soco/theme-db/schema/themeComponents";
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

const ThemeComponentForm = ({
  themeComponent,
  closeModal,
}: {
  themeComponent?: ThemeComponent;
  closeModal?: () => void;
}) => {
  
  const editing = !!themeComponent?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertThemeComponentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertThemeComponentParams),
    defaultValues: themeComponent ?? {
      name: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.themeComponents.getThemeComponents.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Theme Component ${action}d!`);
  };

  const { mutate: createThemeComponent, isLoading: isCreating } =
    trpc.themeComponents.createThemeComponent.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateThemeComponent, isLoading: isUpdating } =
    trpc.themeComponents.updateThemeComponent.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteThemeComponent, isLoading: isDeleting } =
    trpc.themeComponents.deleteThemeComponent.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewThemeComponentParams) => {
    if (editing) {
      updateThemeComponent({ ...values, id: themeComponent.id });
    } else {
      createThemeComponent(values);
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
            onClick={() => deleteThemeComponent({ id: themeComponent.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ThemeComponentForm;
