import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { Card } from "@/components/ui/card";
import { PAGES } from "@/config/pages.config";
import { Icons } from "@/icons";
import Link from "next/link";

export default function ProfilePage() {
  const menuItems = [
    { title: "Account Details", path: PAGES.ACCOUNT.DETAILS },
    { title: "Profiles", path: PAGES.ACCOUNT.PROFILE },
    { title: "Gift Cards", path: PAGES.GIFT_CARDS },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <TopNavigation title="Profile" />

      {/* Content */}
      <div className="px-4 py-20 max-w-md mx-auto  mt-10">
        <Card className="border-none shadow-none bg-primary/10">
          <div className="space-y-1 p-4 w-full">
            {menuItems.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className={`p-2 w-full items-center justify-between hover:border-b-2 hover:border-primary flex transition-all duration-150 ease-in-out`}
              >
                <span className="pl-3 font-medium">{item.title}</span>
                <Icons name="ARROW_RIGHT" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
