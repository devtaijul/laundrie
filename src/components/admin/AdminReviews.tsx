import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Star, Trash2 } from "lucide-react";

const reviews = [
  {
    name: "John Smith",
    date: "10/11/2025",
    rating: 5,
    comment:
      "Excellent service! My clothes came back perfectly cleaned and folded.",
    reply: "Thank you for your kind words! We appreciate your business.",
    hasReply: true,
  },
  {
    name: "John Smith",
    date: "10/11/2025",
    rating: 5,
    comment:
      "Excellent service! My clothes came back perfectly cleaned and folded.",
    reply: null,
    hasReply: false,
  },
];

const AdminReviews = () => {
  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Reviews Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage Your Customer Reviews
            </p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Card key={index} className="border-2 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                <p className="text-sm text-foreground mb-4">{review.comment}</p>

                {review.hasReply && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs font-medium text-primary">
                        Your Reply:
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-foreground">{review.reply}</p>
                  </div>
                )}

                <Button
                  variant={review.hasReply ? "ghost" : "default"}
                  className={review.hasReply ? "text-primary" : ""}
                  size="sm"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {review.hasReply ? "Edit Reply" : "Reply"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminReviews;
