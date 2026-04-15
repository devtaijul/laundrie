"use client";

import { useState } from "react";
import { User, Briefcase, Bell, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { updateProfile } from "@/actions/user.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UserDTO } from "@/types/user.type";

interface Props {
  user: Partial<UserDTO>;
}

export const ProfileForm = ({ user }: Props) => {
  const [useType, setUseType] = useState<"PERSONAL" | "BUSINESS">(
    (user.useType as "PERSONAL" | "BUSINESS") ?? "PERSONAL",
  );
  const [isOver65, setIsOver65] = useState(user.isOver65 ?? false);
  const [marketing, setMarketing] = useState(user.marketing ?? false);
  const [notifications, setNotifications] = useState(
    user.notifications ?? true,
  );
  const [loading, setLoading] = useState(false);

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    "User";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleSave() {
    setLoading(true);
    const res = await updateProfile({ useType, isOver65, marketing, notifications });
    if (res.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(!res.success && "error" in res ? String(res.error) : "Failed to update profile");
    }
    setLoading(false);
  }

  return (
    <div className="px-4 py-8 max-w-lg mx-auto space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold">
          {initials}
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground text-lg">{displayName}</p>
          {user.email && (
            <p className="text-sm text-muted-foreground">{user.email}</p>
          )}
        </div>
      </div>

      {/* Account Type */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Account Type</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(["PERSONAL", "BUSINESS"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setUseType(type)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                  useType === type
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/40",
                )}
              >
                {type === "PERSONAL" ? (
                  <User className={cn("h-6 w-6", useType === type ? "text-primary" : "text-muted-foreground")} />
                ) : (
                  <Briefcase className={cn("h-6 w-6", useType === type ? "text-primary" : "text-muted-foreground")} />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    useType === type ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {type === "PERSONAL" ? "Personal" : "Business"}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Tag className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Preferences</h3>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Age 65 or older</p>
              <p className="text-xs text-muted-foreground">
                You may qualify for senior discounts
              </p>
            </div>
            <Switch checked={isOver65} onCheckedChange={setIsOver65} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Communications</h3>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Order notifications</p>
              <p className="text-xs text-muted-foreground">
                Updates about your orders
              </p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Marketing emails</p>
              <p className="text-xs text-muted-foreground">
                Promotions, offers, and news
              </p>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </div>
  );
};
