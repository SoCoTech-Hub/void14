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
  insertProfileParams,
  NewProfileParams,
  Profile,
} from "@soco/profile-db/schema/profiles";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@soco/ui/select";
import { cn } from "@soco/utils";

const ProfileForm = ({
  profile,
  closeModal,
}: {
  profile?: Profile;
  closeModal?: () => void;
}) => {
  const { data: addresses } = trpc.addresses.getAddresses.useQuery();
  const { data: genders } = trpc.genders.getGenders.useQuery();
  const { data: nextOfKins } = trpc.nextOfKins.getNextOfKins.useQuery();
  const editing = !!profile?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertProfileParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertProfileParams),
    defaultValues: profile ?? {
      name: "",
      surname: "",
      fullName: "",
      idNumber: "",
      mobile: "",
      bio: "",
      dateOfBirth: "",
      uniqueId: "",
      addressId: "",
      genderId: "",
      nextOfKinId: "",
    },
  });

  const onError = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }
    return;
  };

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }

    await utils.profiles.getProfiles.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Profile ${action}d!`);
  };

  const { mutate: createProfile, isLoading: isCreating } =
    trpc.profiles.createProfile.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateProfile, isLoading: isUpdating } =
    trpc.profiles.updateProfile.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteProfile, isLoading: isDeleting } =
    trpc.profiles.deleteProfile.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewProfileParams) => {
    if (editing) {
      updateProfile({ ...values, id: profile.id });
    } else {
      createProfile(values);
    }
  };
  return (
    <Form {...form}>
      {/* TODO: Add scroll-bar */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id Number</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Of Birth</FormLabel>
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
                      {/* TODO: Fix Date field */}
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
        <FormField
          control={form.control}
          name="uniqueId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unique Id</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a address" />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses?.addresses.map((address) => (
                      <SelectItem
                        key={address.id}
                        value={address.id.toString()}
                      >
                        {address.line1}{" "}
                        {/* TODO: Replace with a field from the address model */}
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
          name="genderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders?.genders.map((gender) => (
                      <SelectItem key={gender.id} value={gender.id.toString()}>
                        {gender.name}{" "}
                        {/* TODO: Replace with a field from the gender model */}
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
          name="nextOfKinId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Of Kin Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a next of kin" />
                  </SelectTrigger>
                  <SelectContent>
                    {nextOfKins?.nextOfKins.map((nextOfKin) => (
                      <SelectItem
                        key={nextOfKin.id}
                        value={nextOfKin.id.toString()}
                      >
                        {nextOfKin.name}{" "}
                        {/* TODO: Replace with a field from the nextOfKin model */}
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
            onClick={() => deleteProfile({ id: profile.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ProfileForm;
