"use client";

import { GradeCategoriesHistory, NewGradeCategoriesHistoryParams, insertGradeCategoriesHistoryParams } from "@/lib/db/schema/gradeCategoriesHistories";
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

const GradeCategoriesHistoryForm = ({
  gradeCategoriesHistory,
  closeModal,
}: {
  gradeCategoriesHistory?: GradeCategoriesHistory;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradeCategoriesHistory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradeCategoriesHistoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradeCategoriesHistoryParams),
    defaultValues: gradeCategoriesHistory ?? {
      action: "",
     aggregateOnlyGraded: false,
     aggregateOutcomes: false,
     aggregateSubCats: false,
     aggregation: 0,
     courseId: "",
     depth: 0,
     dropLow: 0,
     fullName: "",
     hidden: false,
     keepHigh: 0,
     loggedUser: "",
     oldId: "",
     parent: "",
     path: "",
     source: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradeCategoriesHistories.getGradeCategoriesHistories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Grade Categories History ${action}d!`);
  };

  const { mutate: createGradeCategoriesHistory, isLoading: isCreating } =
    trpc.gradeCategoriesHistories.createGradeCategoriesHistory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradeCategoriesHistory, isLoading: isUpdating } =
    trpc.gradeCategoriesHistories.updateGradeCategoriesHistory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradeCategoriesHistory, isLoading: isDeleting } =
    trpc.gradeCategoriesHistories.deleteGradeCategoriesHistory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradeCategoriesHistoryParams) => {
    if (editing) {
      updateGradeCategoriesHistory({ ...values, id: gradeCategoriesHistory.id });
    } else {
      createGradeCategoriesHistory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (<FormItem>
              <FormLabel>Action</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aggregateOnlyGraded"
          render={({ field }) => (<FormItem>
              <FormLabel>Aggregate Only Graded</FormLabel>
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
          name="aggregateOutcomes"
          render={({ field }) => (<FormItem>
              <FormLabel>Aggregate Outcomes</FormLabel>
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
          name="aggregateSubCats"
          render={({ field }) => (<FormItem>
              <FormLabel>Aggregate Sub Cats</FormLabel>
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
          name="aggregation"
          render={({ field }) => (<FormItem>
              <FormLabel>Aggregation</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depth"
          render={({ field }) => (<FormItem>
              <FormLabel>Depth</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropLow"
          render={({ field }) => (<FormItem>
              <FormLabel>Drop Low</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (<FormItem>
              <FormLabel>Full Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hidden"
          render={({ field }) => (<FormItem>
              <FormLabel>Hidden</FormLabel>
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
          name="keepHigh"
          render={({ field }) => (<FormItem>
              <FormLabel>Keep High</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loggedUser"
          render={({ field }) => (<FormItem>
              <FormLabel>Logged User</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldId"
          render={({ field }) => (<FormItem>
              <FormLabel>Old Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (<FormItem>
              <FormLabel>Parent</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (<FormItem>
              <FormLabel>Path</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (<FormItem>
              <FormLabel>Source</FormLabel>
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
            onClick={() => deleteGradeCategoriesHistory({ id: gradeCategoriesHistory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradeCategoriesHistoryForm;
