import AdminReviews from "@/components/admin/AdminReviews";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ rating?: string; published?: string; page?: string }>;
}) => {
  const { rating, published, page } = await searchParams;

  return (
    <AdminReviews
      rating={rating ? Number(rating) : undefined}
      published={published}
      page={page ? Number(page) : 1}
    />
  );
};

export default page;
