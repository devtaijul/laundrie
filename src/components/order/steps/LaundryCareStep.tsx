import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useOrder } from "@/contexts/OrderContext";
import { LaundryCareField, LaundryCareValue } from "@/types/global-type";
import { useState } from "react";

export const LaundryCareStep = () => {
  const { state, dispatch } = useOrder();
  const [openAddRequest, setOpenAddRequest] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const updateData = (field: LaundryCareField, value: LaundryCareValue) => {
    dispatch({ type: "UPDATE_DATA", field, value });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">LAUNDRY CARE</h2>
        <p className="text-muted-foreground">
          Choose detergent and special care options
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Detergent
          </label>
          <Select
            value={state.data.detergent}
            onValueChange={(value) => updateData("detergent", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select detergent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Classic Scented">Classic Scented</SelectItem>
              <SelectItem value="Free & Clear">Free & Clear</SelectItem>
              <SelectItem value="Hypoallergenic">Hypoallergenic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className=" flex items-center space-x-4 justify-between">
          <div className="flex items-center space-x-3 px-5 py-4 flex-1 rounded-md border border-gray-200">
            <Checkbox
              id="delicate"
              checked={state.data.delicateCycle}
              onCheckedChange={(checked) =>
                updateData("delicateCycle", checked)
              }
              className="text-primary"
            />
            <label htmlFor="delicate" className="text-foreground">
              Delicate cycle
            </label>
          </div>

          <div className="flex items-center space-x-3 px-5 py-4  rounded-md border border-gray-200">
            <Checkbox
              id="hangers"
              checked={state.data.returnOnHangers}
              onCheckedChange={(checked) =>
                updateData("returnOnHangers", checked)
              }
              className="text-primary"
            />
            <label htmlFor="hangers" className="text-foreground">
              Return items on hangers
            </label>
          </div>
        </div>

        <div>
          <div className=" mb-2 flex justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="additional"
                checked={openAddNote}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setOpenAddNote(true);
                    setOpenAddRequest(true);
                  } else {
                    setOpenAddNote(false);
                    updateData("additionalRequests", "");
                  }
                }}
                className="text-primary"
              />
              <label
                htmlFor="additional"
                className="text-foreground font-medium"
              >
                Additional Requests
              </label>
            </div>
            <span
              onClick={() => {
                setOpenAddRequest(true);
              }}
              className="cursor-pointer"
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={12} cy={12} r={11.5} stroke="#2180A6" />
                <path
                  d="M11.3381 14.9652L11.2761 12.4723H11.7561C12.3342 12.4723 12.871 12.4155 13.3664 12.3019C13.8723 12.1884 14.28 11.9665 14.5897 11.6361C14.8993 11.3058 15.0542 10.8103 15.0542 10.1497C15.0542 9.50969 14.8529 9.00388 14.4503 8.63227C14.0581 8.26065 13.5368 8.07485 12.8864 8.07485C12.2258 8.07485 11.7045 8.25549 11.3226 8.61678C10.9406 8.97807 10.7497 9.46323 10.7497 10.0723H9.51097C9.51097 9.45291 9.65032 8.91098 9.92903 8.44646C10.2181 7.98194 10.6155 7.62065 11.1213 7.36259C11.3794 7.2284 11.6529 7.13033 11.9419 7.0684C12.2413 7.00646 12.5561 6.97549 12.8864 6.97549C13.5574 6.97549 14.151 7.10453 14.6671 7.36259C15.1832 7.62065 15.5858 7.98711 15.8748 8.46194C16.0193 8.69936 16.1277 8.95743 16.2 9.23614C16.2723 9.51485 16.3084 9.81936 16.3084 10.1497C16.3084 10.9136 16.1484 11.5329 15.8284 12.0077C15.5084 12.4826 15.0593 12.8284 14.4813 13.0452C14.1923 13.1484 13.8826 13.231 13.5523 13.2929C13.2219 13.3445 12.8761 13.3703 12.5148 13.3703L12.4684 14.9652H11.3381ZM11.8955 18.0774C11.6374 18.0774 11.4206 17.9948 11.2452 17.8297C11.08 17.6542 10.9974 17.4426 10.9974 17.1948C10.9974 16.9471 11.08 16.7406 11.2452 16.5755C11.4206 16.4 11.6374 16.3123 11.8955 16.3123C12.1535 16.3123 12.3652 16.4 12.5303 16.5755C12.6955 16.7406 12.7781 16.9471 12.7781 17.1948C12.7781 17.4426 12.6955 17.6542 12.5303 17.8297C12.3652 17.9948 12.1535 18.0774 11.8955 18.0774Z"
                  fill="#2180A6"
                />
              </svg>
            </span>
          </div>
          {openAddNote && (
            <Textarea
              placeholder="Any additional request? (Optional)"
              value={state.data.additionalRequests}
              onChange={(e) => updateData("additionalRequests", e.target.value)}
              className="min-h-[100px]"
            />
          )}
        </div>
        <div>
          <Sheet open={openAddRequest} onOpenChange={setOpenAddRequest}>
            <SheetContent
              side="bottom"
              className="w-[400px] sm:w-[540px] mx-auto"
            >
              <SheetHeader className="mb-5">
                <SheetTitle>Additional Requests</SheetTitle>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 ">
                <span>Laundry Pros provide a wash-dry-fold service.</span>
                <span>
                  They do not look for stains, treat stains, or use any stain
                  removal products.
                </span>
                <span>
                  They do not offer additional services like ironing, lint
                  removal, shoe cleaning, hand washing, or dry cleaning.
                </span>
                <span>
                  If you request specific products other than detergent, please
                  leave them out for pickup.
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-blue-50 rounded-lg p-3 flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">€</span>
            </div>
            <div>
              <p className="font-medium text-primary">€10 Bonus Credits</p>
              <p className="text-xs text-muted-foreground">Expires in 06:28</p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
