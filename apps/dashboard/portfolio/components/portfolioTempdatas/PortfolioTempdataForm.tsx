"use client";

import { PortfolioTempdata, NewPortfolioTempdataParams, insertPortfolioTempdataParams } from "@soco/portfolio-db/schema/portfolioTempdatas";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PortfolioTempdataForm = ({
  portfolioTempdata,
  closeModal,
}: {
  portfolioTempdata?: PortfolioTempdata;
  closeModal?: () => void;
}) => {
  const { data: portfolioInstances } = trpc.portfolioInstances.getPortfolioInstances.useQuery();
  const editing = !!portfolioTempdata?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPortfolioTempdataParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPortfolioTempdataParams),
    defaultValues: portfolioTempdata ?? {
      data: "",
     expiryTime: 0,
     portfolioInstanceId: "",
     queued: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.portfolioTempdatas.getPortfolioTempdatas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Portfolio Tempdata ${action}d!`);
  };

  const { mutate: createPortfolioTempdata, isLoading: isCreating } =
    trpc.portfolioTempdatas.createPortfolioTempdata.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePortfolioTempdata, isLoading: isUpdating } =
    trpc.portfolioTempdatas.updatePortfolioTempdata.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePortfolioTempdata, isLoading: isDeleting } =
    trpc.portfolioTempdatas.deletePortfolioTempdata.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPortfolioTempdataParams) => {
    if (editing) {
      updatePortfolioTempdata({ ...values, id: portfolioTempdata.id });
    } else {
      createPortfolioTempdata(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (<FormItem>
              <FormLabel>Data</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryTime"
          render={({ field }) => (<FormItem>
              <FormLabel>Expiry Time</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="queued"
          render={({ field }) => (<FormItem>
              <FormLabel>Queued</FormLabel>
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
            onClick={() => deletePortfolioTempdata({ id: portfolioTempdata.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PortfolioTempdataForm;
