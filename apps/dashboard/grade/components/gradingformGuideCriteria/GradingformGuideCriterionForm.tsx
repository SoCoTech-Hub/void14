"use client";

import { GradingformGuideCriterion, NewGradingformGuideCriterionParams, insertGradingformGuideCriterionParams } from "@soco/grade-db/schema/gradingformGuideCriteria";
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

const GradingformGuideCriterionForm = ({
  gradingformGuideCriterion,
  closeModal,
}: {
  gradingformGuideCriterion?: GradingformGuideCriterion;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradingformGuideCriterion?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradingformGuideCriterionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradingformGuideCriterionParams),
    defaultValues: gradingformGuideCriterion ?? {
      definitionId: "",
     description: "",
     descriptionFormat: 0,
     descriptionMarkers: "",
     descriptionMarkersFormat: 0,
     maxScore: 0.0,
     shortName: "",
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

    await utils.gradingformGuideCriteria.getGradingformGuideCriteria.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Gradingform Guide Criterion ${action}d!`);
  };

  const { mutate: createGradingformGuideCriterion, isLoading: isCreating } =
    trpc.gradingformGuideCriteria.createGradingformGuideCriterion.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradingformGuideCriterion, isLoading: isUpdating } =
    trpc.gradingformGuideCriteria.updateGradingformGuideCriterion.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradingformGuideCriterion, isLoading: isDeleting } =
    trpc.gradingformGuideCriteria.deleteGradingformGuideCriterion.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradingformGuideCriterionParams) => {
    if (editing) {
      updateGradingformGuideCriterion({ ...values, id: gradingformGuideCriterion.id });
    } else {
      createGradingformGuideCriterion(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="definitionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition Id</FormLabel>
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
          name="descriptionFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Description Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionMarkers"
          render={({ field }) => (<FormItem>
              <FormLabel>Description Markers</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionMarkersFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Description Markers Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxScore"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Score</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortName"
          render={({ field }) => (<FormItem>
              <FormLabel>Short Name</FormLabel>
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
            onClick={() => deleteGradingformGuideCriterion({ id: gradingformGuideCriterion.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradingformGuideCriterionForm;
