import { getActiveOrders } from "@/actions/order.actions";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { LaundrieServer } from "@/components/order/LaundrieServer";

const page = async () => {
  getActiveOrders();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 text-center">
        <h1 className="text-2xl font-bold text-primary">laundrie</h1>
      </div>

      {/* Main Content */}
      <LaundrieServer />
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default page;
