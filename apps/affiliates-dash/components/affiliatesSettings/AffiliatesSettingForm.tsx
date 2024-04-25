"use client";

import { AffiliatesSetting, NewAffiliatesSettingParams, insertAffiliatesSettingParams } from "@/lib/db/schema/affiliatesSettings";
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

const AffiliatesSettingForm = ({
  affiliatesSetting,
  closeModal,
}: {
  affiliatesSetting?: AffiliatesSetting;
  closeModal?: () => void;
}) => {
  
  const editing = !!affiliatesSetting?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAffiliatesSettingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAffiliatesSettingParams),
    defaultValues: affiliatesSetting ?? {
      rate: 0,
     terms: "",
     isActive: false,
     organizationId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.affiliatesSettings.getAffiliatesSettings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Affiliates Setting ${action}d!`);
  };

  const { mutate: createAffiliatesSetting, isLoading: isCreating } =
    trpc.affiliatesSettings.createAffiliatesSetting.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAffiliatesSetting, isLoading: isUpdating } =
    trpc.affiliatesSettings.updateAffiliatesSetting.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAffiliatesSetting, isLoading: isDeleting } =
    trpc.affiliatesSettings.deleteAffiliatesSetting.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAffiliatesSettingParams) => {
    if (editing) {
      updateAffiliatesSetting({ ...values, id: affiliatesSetting.id });
    } else {
      createAffiliatesSetting(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (<FormItem>
              <FormLabel>Rate</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (<FormItem>
              <FormLabel>Terms</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (<FormItem>
              <FormLabel>Is Active</FormLabel>
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
          name="organizationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Organization Id</FormLabel>
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
            onClick={() => deleteAffiliatesSetting({ id: affiliatesSetting.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AffiliatesSettingForm;
