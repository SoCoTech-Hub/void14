"use client";

import { CompetencyModuleComp, NewCompetencyModuleCompParams, insertCompetencyModuleCompParams } from "@/lib/db/schema/competencyModuleComps";
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

const CompetencyModuleCompForm = ({
  competencyModuleComp,
  closeModal,
}: {
  competencyModuleComp?: CompetencyModuleComp;
  closeModal?: () => void;
}) => {
  const { data: competencies } = trpc.competencies.getCompetencies.useQuery();
  const editing = !!competencyModuleComp?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCompetencyModuleCompParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCompetencyModuleCompParams),
    defaultValues: competencyModuleComp ?? {
      cmId: "",
     competencyId: "",
     ruleOutcome: 0,
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

    await utils.competencyModuleComps.getCompetencyModuleComps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Competency Module Comp ${action}d!`);
  };

  const { mutate: createCompetencyModuleComp, isLoading: isCreating } =
    trpc.competencyModuleComps.createCompetencyModuleComp.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCompetencyModuleComp, isLoading: isUpdating } =
    trpc.competencyModuleComps.updateCompetencyModuleComp.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCompetencyModuleComp, isLoading: isDeleting } =
    trpc.competencyModuleComps.deleteCompetencyModuleComp.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCompetencyModuleCompParams) => {
    if (editing) {
      updateCompetencyModuleComp({ ...values, id: competencyModuleComp.id });
    } else {
      createCompetencyModuleComp(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="cmId"
          render={({ field }) => (<FormItem>
              <FormLabel>Cm Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="competencyId"
          render={({ field }) => (<FormItem>
              <FormLabel>Competency Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a competency" />
                  </SelectTrigger>
                  <SelectContent>
                    {competencies?.competencies.map((competency) => (
                      <SelectItem key={competency.competency.id} value={competency.competency.id.toString()}>
                        {competency.competency.id}  {/* TODO: Replace with a field from the competency model */}
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
          name="ruleOutcome"
          render={({ field }) => (<FormItem>
              <FormLabel>Rule Outcome</FormLabel>
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
            onClick={() => deleteCompetencyModuleComp({ id: competencyModuleComp.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CompetencyModuleCompForm;
