import { OrderEvent } from "@/generated/prisma";
import { formatDate, getEventStatusColor } from "@/lib/utils";
import { Card } from "../ui/card";

export const EventTimeline = ({
  orderEvents,
}: {
  orderEvents: OrderEvent[];
}) => {
  return (
    <Card className="p-6 bg-background/95 backdrop-blur-sm">
      <h3 className="font-semibold mb-4">Order Timeline</h3>
      <div className="space-y-4">
        {orderEvents.map((event) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${getEventStatusColor(event.type)}`}
              />
              <div
                className={`w-0.5 h-12 ${getEventStatusColor(event.type)}`}
              />
            </div>
            <div className="flex-1 -mt-1">
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(event.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
