"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Business } from "@/generated/prisma";
import { Save, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessFormData, businessSchema } from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updateBusinessSetting } from "@/actions/setting.actions";

export const BusinessTabForm = ({
  business,
}: {
  business: Business | null;
}) => {
  const { isProcessing, runAction } = useAsyncAction(updateBusinessSetting, {
    successMessage: "Settings updated successfully",
    errorMessage: "Failed to update settings",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      business_name: business?.business_name || "",
      business_email: business?.business_email || "",
      phone: business?.phone || "",
      whatsapp_number: business?.whatsapp_number || "",
      business_address: business?.business_address || "",
      city: business?.city || "",
      state: business?.state || "",
      zip_code: business?.zip_code || "",
      description: business?.description || "",
      logo_url: business?.logo_url || "",
      favicon_url: business?.favicon_url || "",
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    console.log("FORM DATA:", data);

    runAction(data, business?.id as string);

    // Example: You can call a server action here ⬇️
    // await updateBusinessAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Business Name *</Label>
          <Input {...register("business_name")} />
          {errors.business_name && (
            <p className="text-red-500 text-sm">
              {errors.business_name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Business Email *</Label>
          <Input type="email" {...register("business_email")} />
          {errors.business_email && (
            <p className="text-red-500 text-sm">
              {errors.business_email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Phone Number *</Label>
          <Input
            type="tel"
            placeholder="+31 6 1234 5678"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>WhatsApp Number</Label>
          <Input
            type="tel"
            placeholder="+31 6 1234 5678"
            {...register("whatsapp_number")}
          />
          {errors.whatsapp_number && (
            <p className="text-red-500 text-sm">
              {errors.whatsapp_number.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label>Business Address *</Label>
        <Input {...register("business_address")} />
      </div>

      {/* City/State/Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>City</Label>
          <Input {...register("city")} />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input {...register("state")} />
        </div>
        <div className="space-y-2">
          <Label>ZIP Code</Label>
          <Input {...register("zip_code")} />
        </div>
      </div>

      {/* Logo Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>Business Logo</Label>
          <input type="file" className="hidden" id="logo" />
          <div className="border-2 border-dashed p-6 rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <label htmlFor="logo">
              <Button variant="outline" size="sm" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            </label>
          </div>
        </div>

        {/* Favicon Upload */}
        <div className="space-y-3">
          <Label>Favicon</Label>
          <input type="file" className="hidden" id="favicon" />
          <div className="border-2 border-dashed p-6 rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <label htmlFor="favicon">
              <Button variant="outline" size="sm" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Upload Favicon
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>About Business</Label>
        <Textarea {...register("description")} className="min-h-24" />
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isProcessing}
      >
        <Save className="w-4 h-4 mr-2" />
        {isProcessing ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};
