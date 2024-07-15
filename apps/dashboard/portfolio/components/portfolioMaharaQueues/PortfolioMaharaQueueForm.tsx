"use client";

import { PortfolioMaharaQueue, NewPortfolioMaharaQueueParams, insertPortfolioMaharaQueueParams } from "@soco/portfolio-db/schema/portfolioMaharaQueues";
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

const PortfolioMaharaQueueForm = ({
  portfolioMaharaQueue,
  closeModal,
}: {
  portfolioMaharaQueue?: PortfolioMaharaQueue;
  closeModal?: () => void;
}) => {
  const { data: portfolioTempdatas } = trpc.portfolioTempdatas.getPortfolioTempdatas.useQuery();
  const editing = !!portfolioMaharaQueue?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPortfolioMaharaQueueParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPortfolioMaharaQueueParams),
    defaultValues: portfolioMaharaQueue ?? {
      token: "",
     portfolioTempdataId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.portfolioMaharaQueues.getPortfolioMaharaQueues.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Portfolio Mahara Queue ${action}d!`);
  };

  const { mutate: createPortfolioMaharaQueue, isLoading: isCreating } =
    trpc.portfolioMaharaQueues.createPortfolioMaharaQueue.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePortfolioMaharaQueue, isLoading: isUpdating } =
    trpc.portfolioMaharaQueues.updatePortfolioMaharaQueue.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePortfolioMaharaQueue, isLoading: isDeleting } =
    trpc.portfolioMaharaQueues.deletePortfolioMaharaQueue.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPortfolioMaharaQueueParams) => {
    if (editing) {
      updatePortfolioMaharaQueue({ ...values, id: portfolioMaharaQueue.id });
    } else {
      createPortfolioMaharaQueue(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (<FormItem>
              <FormLabel>Token</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioTempdataId"
          render={({ field }) => (<FormItem>
              <FormLabel>Portfolio Tempdata Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a portfolio tempdata" />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolioTempdatas?.portfolioTempdatas.map((portfolioTempdata) => (
                      <SelectItem key={portfolioTempdata.portfolioTempdata.id} value={portfolioTempdata.portfolioTempdata.id.toString()}>
                        {portfolioTempdata.portfolioTempdata.id}  {/* TODO: Replace with a field from the portfolioTempdata model */}
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
            onClick={() => deletePortfolioMaharaQueue({ id: portfolioMaharaQueue.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PortfolioMaharaQueueForm;
