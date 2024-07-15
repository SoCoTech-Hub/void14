"use client";

import { ScormSeqRuleCondition, NewScormSeqRuleConditionParams, insertScormSeqRuleConditionParams } from "@soco/scorm-db/schema/scormSeqRuleConditions";
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

const ScormSeqRuleConditionForm = ({
  scormSeqRuleCondition,
  closeModal,
}: {
  scormSeqRuleCondition?: ScormSeqRuleCondition;
  closeModal?: () => void;
}) => {
  const { data: scormSeqRuleConds } = trpc.scormSeqRuleConds.getScormSeqRuleConds.useQuery();
  const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery();
  const editing = !!scormSeqRuleCondition?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormSeqRuleConditionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormSeqRuleConditionParams),
    defaultValues: scormSeqRuleCondition ?? {
      cond: "",
     measureThreshold: 0.0,
     operator: "",
     refrencedObjective: "",
     scormSeqRuleCondId: "",
     scormScoeId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.scormSeqRuleConditions.getScormSeqRuleConditions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Seq Rule Condition ${action}d!`);
  };

  const { mutate: createScormSeqRuleCondition, isLoading: isCreating } =
    trpc.scormSeqRuleConditions.createScormSeqRuleCondition.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormSeqRuleCondition, isLoading: isUpdating } =
    trpc.scormSeqRuleConditions.updateScormSeqRuleCondition.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormSeqRuleCondition, isLoading: isDeleting } =
    trpc.scormSeqRuleConditions.deleteScormSeqRuleCondition.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormSeqRuleConditionParams) => {
    if (editing) {
      updateScormSeqRuleCondition({ ...values, id: scormSeqRuleCondition.id });
    } else {
      createScormSeqRuleCondition(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="cond"
          render={({ field }) => (<FormItem>
              <FormLabel>Cond</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="measureThreshold"
          render={({ field }) => (<FormItem>
              <FormLabel>Measure Threshold</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operator"
          render={({ field }) => (<FormItem>
              <FormLabel>Operator</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="refrencedObjective"
          render={({ field }) => (<FormItem>
              <FormLabel>Refrenced Objective</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scormSeqRuleCondId"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Seq Rule Cond Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scorm seq rule cond" />
                  </SelectTrigger>
                  <SelectContent>
                    {scormSeqRuleConds?.scormSeqRuleConds.map((scormSeqRuleCond) => (
                      <SelectItem key={scormSeqRuleCond.scormSeqRuleCond.id} value={scormSeqRuleCond.scormSeqRuleCond.id.toString()}>
                        {scormSeqRuleCond.scormSeqRuleCond.id}  {/* TODO: Replace with a field from the scormSeqRuleCond model */}
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
          name="scormScoeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Scoe Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scorm scoe" />
                  </SelectTrigger>
                  <SelectContent>
                    {scormScoes?.scormScoes.map((scormScoe) => (
                      <SelectItem key={scormScoe.scormScoe.id} value={scormScoe.scormScoe.id.toString()}>
                        {scormScoe.scormScoe.id}  {/* TODO: Replace with a field from the scormScoe model */}
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
            onClick={() => deleteScormSeqRuleCondition({ id: scormSeqRuleCondition.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormSeqRuleConditionForm;
