import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserExtends } from "@/types/global-type";
import { MoreVertical } from "lucide-react";

export const DriverCard = ({ driver }: { driver: UserExtends | null }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver?.name}-${driver?.id}`}
              />
              <AvatarFallback>{driver?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{driver?.name}</h3>
              <p className="text-sm text-primary">{driver?.vehicleNumber}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="text-sm text-foreground">{driver?.location}</p>
        </div>
      </CardContent>
    </Card>
  );
};
