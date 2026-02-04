"use client";

import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, ReactNode } from "react";

type HeaderProps = {
  /** Center title text */
  title?: string;

  /** Custom back handler; না দিলে router.back() চলবে */
  onBack?: () => void;

  /** ডান পাশের help আইকন দেখাবে কি না — ডিফল্ট: true if any help prop exists */
  showHelpIcon?: boolean;

  /** help আইকনে ক্লিক করলে যেটা ওপেন হবে সেই Dialog/Sheet ইত্যাদি */
  helpDialog?: ReactNode;

  /** help আইকনে ক্লিকের কাস্টম হ্যান্ডলার; দিলে internal open state ব্যবহার হবে না */
  onHelpClick?: () => void;

  /** help আইকনের কাস্টম আইকন (optional) */
  helpIcon?: ReactNode;

  /** Wrapper classes override */
  className?: string;
};

export function TopNavigation({
  title = "Title",
  onBack,
  showHelpIcon,
  helpDialog,
  onHelpClick,
  helpIcon,
  className = "",
}: HeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  // help দেখাবে কি না নির্ধারণ
  const shouldShowHelp =
    typeof showHelpIcon === "boolean"
      ? showHelpIcon
      : Boolean(helpDialog || onHelpClick); // ডিফল্ট লজিক

  const RightIcon = helpIcon ?? <HelpCircle className="h-5 w-5" />;

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-4 ${className}`}
      >
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-primary hover:bg-white/50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h1 className="text-lg font-semibold text-primary truncate">
            {title}
          </h1>

          {shouldShowHelp ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (onHelpClick ? onHelpClick() : setOpen(true))}
              className="text-primary hover:bg-white/50"
              aria-label="Help"
            >
              {RightIcon}
            </Button>
          ) : (
            // প্লেসহোল্ডার যাতে header balance থাকে
            <div className="h-10 w-10" aria-hidden />
          )}
        </div>
      </div>

      {/* যদি helpDialog দেওয়া থাকে তাহলে এটাতে open/onOpenChange প্রপ্স পাস করব */}
      {helpDialog &&
        // helpDialog এমন কোনো কম্পোনেন্ট হওয়া উচিত যেটা open এবং onOpenChange প্রপ্স নেয় (Radix Dialog/Sheet pattern)
        // আমরা clone করে control props ইনজেক্ট করছি
        // eslint-disable-next-line react/jsx-key

        open != null &&
        typeof helpDialog === "object" &&
        (helpDialog.type ? (
          <helpDialog.type
            {...helpDialog.props}
            open={open}
            onOpenChange={setOpen}
          />
        ) : null)}
    </>
  );
}
