"use client";
import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/Heading";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formShema = z.object({
  name: z.string().min(1),
});
type SettingFormValue = z.infer<typeof formShema>;
const SettingForm = ({ initialData }: { initialData: Store }) => {
  const form = useForm<SettingFormValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const params=useParams()
  const origin=useOrigin();
  const onSubmit = async (data: SettingFormValue) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${initialData.id}`, data);
      toast.success("Store Update.");
      route.refresh();
    } catch (error) {
      setIsLoading(true);
      toast.error("Somethings went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${initialData.id}`);
      route.refresh();
      route.push("/");
      toast.success("Store Delete.");
    } catch (error) {
      toast.error("Make sure you  removed all products and categories first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false)
    }
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex justify-between items-center">
        <Heading title="Settings" description="Manage store profernces" />
        <Button
          disabled={isLoading}
          variant={"destructive"}
          size={"icon"}
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator/>
      <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.storeId}`} variant='public'/>
    </>
  );
};

export default SettingForm;
