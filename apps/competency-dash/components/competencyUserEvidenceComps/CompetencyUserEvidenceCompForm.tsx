"use client";

import { CompetencyUserEvidenceComp, NewCompetencyUserEvidenceCompParams, insertCompetencyUserEvidenceCompParams } from "@/lib/db/schema/competencyUserEvidenceComps";
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

const CompetencyUserEvidenceCompForm = ({
  competencyUserEvidenceComp,
  closeModal,
}: {
  competencyUserEvidenceComp?: CompetencyUserEvidenceComp;
  closeModal?: () => void;
}) => {
  const { data: competencies } = trpc.competencies.getCompetencies.useQuery();
  const { data: competencyUserEvidences } = trpc.competencyUserEvidences.getCompetencyUserEvidences.useQuery();
  const editing = !!competencyUserEvidenceComp?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCompetencyUserEvidenceCompParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCompetencyUserEvidenceCompParams),
    defaultValues: competencyUserEvidenceComp ?? {
      competencyId: "",
     competencyUserEvidenceId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.competencyUserEvidenceComps.getCompetencyUserEvidenceComps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Competency User Evidence Comp ${action}d!`);
  };

  const { mutate: createCompetencyUserEvidenceComp, isLoading: isCreating } =
    trpc.competencyUserEvidenceComps.createCompetencyUserEvidenceComp.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCompetencyUserEvidenceComp, isLoading: isUpdating } =
    trpc.competencyUserEvidenceComps.updateCompetencyUserEvidenceComp.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCompetencyUserEvidenceComp, isLoading: isDeleting } =
    trpc.competencyUserEvidenceComps.deleteCompetencyUserEvidenceComp.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCompetencyUserEvidenceCompParams) => {
    if (editing) {
      updateCompetencyUserEvidenceComp({ ...values, id: competencyUserEvidenceComp.id });
    } else {
      createCompetencyUserEvidenceComp(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="competencyUserEvidenceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Competency User Evidence Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a competency user evidence" />
                  </SelectTrigger>
                  <SelectContent>
                    {competencyUserEvidences?.competencyUserEvidences.map((competencyUserEvidence) => (
                      <SelectItem key={competencyUserEvidence.id} value={competencyUserEvidence.id.toString()}>
                        {competencyUserEvidence.id}  {/* TODO: Replace with a field from the competencyUserEvidence model */}
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
            onClick={() => deleteCompetencyUserEvidenceComp({ id: competencyUserEvidenceComp.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CompetencyUserEvidenceCompForm;
