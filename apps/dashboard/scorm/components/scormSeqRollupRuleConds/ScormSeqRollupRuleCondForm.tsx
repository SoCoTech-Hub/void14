"use client";

import { ScormSeqRollupRuleCond, NewScormSeqRollupRuleCondParams, insertScormSeqRollupRuleCondParams } from "@/lib/db/schema/scormSeqRollupRuleConds";
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

const ScormSeqRollupRuleCondForm = ({
  scormSeqRollupRuleCond,
  closeModal,
}: {
  scormSeqRollupRuleCond?: ScormSeqRollupRuleCond;
  closeModal?: () => void;
}) => {
  const { data: scormSeqRollupRules } = trpc.scormSeqRollupRules.getScormSeqRollupRules.useQuery();
  const { data: scormScoes } = trpc.scormScoes.getScormScoes.useQuery();
  const editing = !!scormSeqRollupRuleCond?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertScormSeqRollupRuleCondParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertScormSeqRollupRuleCondParams),
    defaultValues: scormSeqRollupRuleCond ?? {
      cond: "",
     operator: "",
     scormSeqRollupRuleId: "",
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

    await utils.scormSeqRollupRuleConds.getScormSeqRollupRuleConds.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Scorm Seq Rollup Rule Cond ${action}d!`);
  };

  const { mutate: createScormSeqRollupRuleCond, isLoading: isCreating } =
    trpc.scormSeqRollupRuleConds.createScormSeqRollupRuleCond.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateScormSeqRollupRuleCond, isLoading: isUpdating } =
    trpc.scormSeqRollupRuleConds.updateScormSeqRollupRuleCond.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteScormSeqRollupRuleCond, isLoading: isDeleting } =
    trpc.scormSeqRollupRuleConds.deleteScormSeqRollupRuleCond.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewScormSeqRollupRuleCondParams) => {
    if (editing) {
      updateScormSeqRollupRuleCond({ ...values, id: scormSeqRollupRuleCond.id });
    } else {
      createScormSeqRollupRuleCond(values);
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
          name="scormSeqRollupRuleId"
          render={({ field }) => (<FormItem>
              <FormLabel>Scorm Seq Rollup Rule Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scorm seq rollup rule" />
                  </SelectTrigger>
                  <SelectContent>
                    {scormSeqRollupRules?.scormSeqRollupRules.map((scormSeqRollupRule) => (
                      <SelectItem key={scormSeqRollupRule.scormSeqRollupRule.id} value={scormSeqRollupRule.scormSeqRollupRule.id.toString()}>
                        {scormSeqRollupRule.scormSeqRollupRule.id}  {/* TODO: Replace with a field from the scormSeqRollupRule model */}
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
            onClick={() => deleteScormSeqRollupRuleCond({ id: scormSeqRollupRuleCond.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ScormSeqRollupRuleCondForm;
