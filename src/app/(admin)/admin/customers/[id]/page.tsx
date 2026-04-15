import { Suspense } from "react";
import AdminCustomerDetail from "@/components/admin/AdminCustomerDetail";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-6 space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-40 bg-muted rounded-xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      }
    >
      <AdminCustomerDetail id={id} />
    </Suspense>
  );
}
