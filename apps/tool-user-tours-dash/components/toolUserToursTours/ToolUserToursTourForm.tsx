"use client";

import { ToolUserToursTour, NewToolUserToursTourParams, insertToolUserToursTourParams } from "@/lib/db/schema/toolUserToursTours";
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

const ToolUserToursTourForm = ({
  toolUserToursTour,
  closeModal,
}: {
  toolUserToursTour?: ToolUserToursTour;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolUserToursTour?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolUserToursTourParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolUserToursTourParams),
    defaultValues: toolUserToursTour ?? {
      configData: "",
     description: "",
     displayStepNumbers: false,
     enabled: false,
     endTourLabel: "",
     name: "",
     pathMatch: "",
     sortOrder: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolUserToursTours.getToolUserToursTours.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool User Tours Tour ${action}d!`);
  };

  const { mutate: createToolUserToursTour, isLoading: isCreating } =
    trpc.toolUserToursTours.createToolUserToursTour.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolUserToursTour, isLoading: isUpdating } =
    trpc.toolUserToursTours.updateToolUserToursTour.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolUserToursTour, isLoading: isDeleting } =
    trpc.toolUserToursTours.deleteToolUserToursTour.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolUserToursTourParams) => {
    if (editing) {
      updateToolUserToursTour({ ...values, id: toolUserToursTour.id });
    } else {
      createToolUserToursTour(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="configData"
          render={({ field }) => (<FormItem>
              <FormLabel>Config Data</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayStepNumbers"
          render={({ field }) => (<FormItem>
              <FormLabel>Display Step Numbers</FormLabel>
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
          name="enabled"
          render={({ field }) => (<FormItem>
              <FormLabel>Enabled</FormLabel>
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
          name="endTourLabel"
          render={({ field }) => (<FormItem>
              <FormLabel>End Tour Label</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="pathMatch"
          render={({ field }) => (<FormItem>
              <FormLabel>Path Match</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Order</FormLabel>
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
            onClick={() => deleteToolUserToursTour({ id: toolUserToursTour.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolUserToursTourForm;
