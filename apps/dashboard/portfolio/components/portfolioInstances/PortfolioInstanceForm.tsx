"use client";

import { PortfolioInstance, NewPortfolioInstanceParams, insertPortfolioInstanceParams } from "@soco/portfolio-db/schema/portfolioInstances";
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
import { Checkbox } from "@soco/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PortfolioInstanceForm = ({
  portfolioInstance,
  closeModal,
}: {
  portfolioInstance?: PortfolioInstance;
  closeModal?: () => void;
}) => {
  
  const editing = !!portfolioInstance?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPortfolioInstanceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPortfolioInstanceParams),
    defaultValues: portfolioInstance ?? {
      name: "",
     plugin: "",
     visible: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.portfolioInstances.getPortfolioInstances.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Portfolio Instance ${action}d!`);
  };

  const { mutate: createPortfolioInstance, isLoading: isCreating } =
    trpc.portfolioInstances.createPortfolioInstance.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePortfolioInstance, isLoading: isUpdating } =
    trpc.portfolioInstances.updatePortfolioInstance.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePortfolioInstance, isLoading: isDeleting } =
    trpc.portfolioInstances.deletePortfolioInstance.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPortfolioInstanceParams) => {
    if (editing) {
      updatePortfolioInstance({ ...values, id: portfolioInstance.id });
    } else {
      createPortfolioInstance(values);
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
          name="plugin"
          render={({ field }) => (<FormItem>
              <FormLabel>Plugin</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (<FormItem>
              <FormLabel>Visible</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
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
            onClick={() => deletePortfolioInstance({ id: portfolioInstance.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PortfolioInstanceForm;
