import { TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { getAdminProfile, getSecuritySetting } from "@/actions/setting.actions";
import {
  AdminProfileForm,
  ChangePasswordForm,
  SecuritySettingsForm,
} from "./SecurityTabForm";

const FormSkeleton = () => (
  <div className="animate-pulse space-y-4 p-6 rounded-lg border border-border">
    <div className="h-5 bg-muted rounded w-40" />
    <div className="h-4 bg-muted rounded w-64" />
    <div className="space-y-3 mt-4">
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
    </div>
  </div>
);

async function SecurityTabContent() {
  const [profileRes, securityRes] = await Promise.all([
    getAdminProfile(),
    getSecuritySetting(),
  ]);

  return (
    <div className="space-y-6">
      {profileRes.success && profileRes.data ? (
        <AdminProfileForm admin={profileRes.data} />
      ) : (
        <div className="text-sm text-muted-foreground p-4 border rounded-lg">
          Could not load admin profile.
        </div>
      )}

      <ChangePasswordForm />

      {securityRes.success && securityRes.data ? (
        <SecuritySettingsForm security={securityRes.data} />
      ) : (
        <div className="text-sm text-muted-foreground p-4 border rounded-lg">
          Could not load security settings.
        </div>
      )}
    </div>
  );
}

export const SecurityTab = () => {
  return (
    <TabsContent value="security" className="space-y-6">
      <Suspense
        fallback={
          <div className="space-y-6">
            <FormSkeleton />
            <FormSkeleton />
            <FormSkeleton />
          </div>
        }
      >
        <SecurityTabContent />
      </Suspense>
    </TabsContent>
  );
};
