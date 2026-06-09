import { TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { getAuthSetting } from "@/actions/setting.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthTabForm } from "./AuthTabForm";

const CardSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-border p-6 space-y-4">
    <div className="h-5 bg-muted rounded w-48" />
    <div className="h-4 bg-muted rounded w-64" />
    <div className="space-y-3 mt-2">
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
    </div>
  </div>
);

async function AuthTabContent() {
  const data = await getAuthSetting();

  if (!data.success || !data.data) {
    return (
      <div className="text-sm text-muted-foreground p-4 border rounded-lg">
        Could not load auth settings.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Authentication</CardTitle>
        <CardDescription>
          Configure Google OAuth credentials for Continue with Google login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthTabForm authSetting={data.data} />
      </CardContent>
    </Card>
  );
}

export const AuthTab = () => {
  return (
    <TabsContent value="auth" className="space-y-6">
      <Suspense fallback={<CardSkeleton />}>
        <AuthTabContent />
      </Suspense>
    </TabsContent>
  );
};
