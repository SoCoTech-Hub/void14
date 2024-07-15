"use client";

import { PortfolioLog, NewPortfolioLogParams, insertPortfolioLogParams } from "@soco/portfolio-db/schema/portfolioLogs";
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

const PortfolioLogForm = ({
  portfolioLog,
  closeModal,
}: {
  portfolioLog?: PortfolioLog;
  closeModal?: () => void;
}) => {
  const { data: portfolioInstances } = trpc.portfolioInstances.getPortfolioInstances.useQuery();
  const { data: portfolioTempdatas } = trpc.portfolioTempdatas.getPortfolioTempdatas.useQuery();
  const editing = !!portfolioLog?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertPortfolioLogParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertPortfolioLogParams),
    defaultValues: portfolioLog ?? {
      callerClass: "",
     callerComponent: "",
     callerFile: "",
     callerSha1: "",
     continueUrl: "",
     portfolioInstanceId: "",
     returnUrl: "",
     portfolioTempdataId: "",
     time: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.portfolioLogs.getPortfolioLogs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Portfolio Log ${action}d!`);
  };

  const { mutate: createPortfolioLog, isLoading: isCreating } =
    trpc.portfolioLogs.createPortfolioLog.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updatePortfolioLog, isLoading: isUpdating } =
    trpc.portfolioLogs.updatePortfolioLog.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deletePortfolioLog, isLoading: isDeleting } =
    trpc.portfolioLogs.deletePortfolioLog.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewPortfolioLogParams) => {
    if (editing) {
      updatePortfolioLog({ ...values, id: portfolioLog.id });
    } else {
      createPortfolioLog(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="callerClass"
          render={({ field }) => (<FormItem>
              <FormLabel>Caller Class</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="callerComponent"
          render={({ field }) => (<FormItem>
              <FormLabel>Caller Component</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="callerFile"
          render={({ field }) => (<FormItem>
              <FormLabel>Caller File</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="callerSha1"
          render={({ field }) => (<FormItem>
              <FormLabel>Caller Sha1</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="continueUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Continue Url</FormLabel>
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
          name="returnUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Return Url</FormLabel>
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
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (<FormItem>
              <FormLabel>Time</FormLabel>
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
            onClick={() => deletePortfolioLog({ id: portfolioLog.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PortfolioLogForm;
