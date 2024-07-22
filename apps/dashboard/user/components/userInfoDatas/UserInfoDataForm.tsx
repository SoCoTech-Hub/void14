"use client";

import { UserInfoData, NewUserInfoDataParams, insertUserInfoDataParams } from "@soco/user-db/schema/userInfoDatas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@soco/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserInfoDataForm = ({
  userInfoData,
  closeModal,
}: {
  userInfoData?: UserInfoData;
  closeModal?: () => void;
}) => {
  
  const editing = !!userInfoData?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertUserInfoDataParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertUserInfoDataParams),
    defaultValues: userInfoData ?? {
      fieldId: "",
     data: "",
     dataFormat: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.userInfoDatas.getUserInfoDatas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`User Info Data ${action}d!`);
  };

  const { mutate: createUserInfoData, isLoading: isCreating } =
    trpc.userInfoDatas.createUserInfoData.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateUserInfoData, isLoading: isUpdating } =
    trpc.userInfoDatas.updateUserInfoData.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteUserInfoData, isLoading: isDeleting } =
    trpc.userInfoDatas.deleteUserInfoData.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewUserInfoDataParams) => {
    if (editing) {
      updateUserInfoData({ ...values, id: userInfoData.id });
    } else {
      createUserInfoData(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="fieldId"
          render={({ field }) => (<FormItem>
              <FormLabel>Field Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="dataFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Data Format</FormLabel>
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
            onClick={() => deleteUserInfoData({ id: userInfoData.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default UserInfoDataForm;
