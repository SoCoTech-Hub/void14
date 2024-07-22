"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  insertToolCustomLangParams,
  NewToolCustomLangParams,
  ToolCustomLang,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangs";
import { Button } from "@soco/ui/button";
import { Calendar } from "@soco/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@soco/ui/popover";
import { cn } from "@soco/utils";

const ToolCustomLangForm = ({
  toolCustomLang,
  closeModal,
}: {
  toolCustomLang?: ToolCustomLang;
  closeModal?: () => void;
}) => {
  const editing = !!toolCustomLang?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolCustomLangParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolCustomLangParams),
    defaultValues: toolCustomLang ?? {
      componentId: "",
      lang: "",
      local: "",
      master: "",
      modified: 0,
      original: "",
      outdated: 0,
      stringId: "",
      customizedAt: "",
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }

    await utils.toolCustomLangs.getToolCustomLangs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Tool Custom Lang ${action}d!`);
  };

  const { mutate: createToolCustomLang, isLoading: isCreating } =
    trpc.toolCustomLangs.createToolCustomLang.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolCustomLang, isLoading: isUpdating } =
    trpc.toolCustomLangs.updateToolCustomLang.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolCustomLang, isLoading: isDeleting } =
    trpc.toolCustomLangs.deleteToolCustomLang.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolCustomLangParams) => {
    if (editing) {
      updateToolCustomLang({ ...values, id: toolCustomLang.id });
    } else {
      createToolCustomLang(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="componentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Component Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lang</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="local"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="master"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Master</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modified"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modified</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="original"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outdated"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outdated</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stringId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>String Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customizedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customized At</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

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
            onClick={() => deleteToolCustomLang({ id: toolCustomLang.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolCustomLangForm;
