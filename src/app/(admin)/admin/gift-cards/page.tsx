import AdminGiftCards from "@/components/admin/AdminGiftCards";

export default async function AdminGiftCardsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page } = await searchParams;

  return (
    <div className="p-6">
      <AdminGiftCards
        status={status}
        page={page ? Number(page) : 1}
      />
    </div>
  );
}
