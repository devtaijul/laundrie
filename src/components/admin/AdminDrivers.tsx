import { AddNewDriver } from "./AddNewDriver";
import { getAllRider } from "@/actions/rider.actions";
import { DriverCard } from "./DriverCard";
import { Suspense } from "react";
import { DriversGridSkeleton } from "../skeletons/DriversGridSkeleton";
import { UserExtends } from "@/types/global-type";

const AdminDrivers = async ({
  search,
  page,
  take,
}: {
  search: string;
  page: number;
  take: number;
}) => {
  const res = await getAllRider(search, page, take);

  if (!res?.success) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">No drivers found</p>
      </div>
    );
  }

  const drivers = res.data;
  console.log("driver", drivers);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Drivers</h1>
            <p className="text-sm text-muted-foreground">
              Efficiently oversee and coordinate all driver activities from a
              centralized platform.
            </p>
          </div>
          <AddNewDriver />
        </div>

        <Suspense fallback={<DriversGridSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers && drivers?.length > 0 ? (
              drivers.map((driver, index) => (
                <DriverCard key={index} driver={driver as UserExtends} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No drivers found</p>
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default AdminDrivers;
