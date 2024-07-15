"use client";

import { PortfolioInstanceConfig, NewPortfolioInstanceConfigParams, insertPortfolioInstanceConfigParams } from "@soco/portfolio-db/schema/portfolioInstanceConfigs";
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

const PortfolioInstanceConfigForm = ({
  portfolioInstanceConfig,
  closeModal,
}: {
  portfolioInstanceConfig?: PortfolioInstanceConfig;
  closeModal?: () => void;
}) => {
  const { data: portfolioInstances } = trpc.portfolioInstances.getPortfolioInstances.useQuery();
  const editing = !!portfolioInstanceConfig?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPortfolioInstanceConfigParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPortfolioInstanceConfigParams),
    defaultValues: portfolioInstanceConfig ?? {
      portfolioInstanceId: "",
     name: "",
     value: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.portfolioInstanceConfigs.getPortfolioInstanceConfigs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Portfolio Instance Config ${action}d!`);
  };

  const { mutate: createPortfolioInstanceConfig, isLoading: isCreating } =
    trpc.portfolioInstanceConfigs.createPortfolioInstanceConfig.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePortfolioInstanceConfig, isLoading: isUpdating } =
    trpc.portfolioInstanceConfigs.updatePortfolioInstanceConfig.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePortfolioInstanceConfig, isLoading: isDeleting } =
    trpc.portfolioInstanceConfigs.deletePortfolioInstanceConfig.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPortfolioInstanceConfigParams) => {
    if (editing) {
      updatePortfolioInstanceConfig({ ...values, id: portfolioInstanceConfig.id });
    } else {
      createPortfolioInstanceConfig(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="portfolioInstanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Portfolio Instance Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a portfolio instance" />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolioInstances?.portfolioInstances.map((portfolioInstance) => (
                      <SelectItem key={portfolioInstance.id} value={portfolioInstance.id.toString()}>
                        {portfolioInstance.id}  {/* TODO: Replace with a field from the portfolioInstance model */}
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
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
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
            onClick={() => deletePortfolioInstanceConfig({ id: portfolioInstanceConfig.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PortfolioInstanceConfigForm;
