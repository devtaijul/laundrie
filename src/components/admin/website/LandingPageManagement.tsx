import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  unit: string;
  deliveryTime: string;
  features: { text: string; enabled: boolean }[];
}

export function LandingPageManagement() {
  const [heroHeadline, setHeroHeadline] = useState("Laundry Service Simplified");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Effortless laundry made with Laundrie. Have your laundry pickup, delivery & cleaned with just one click!"
  );
  const [heroCTA, setHeroCTA] = useState("Get Started");

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: "1",
      name: "Economy",
      price: "₹70",
      unit: "/per 5kg",
      deliveryTime: "Within 3 days",
      features: [
        { text: "Free Pickup & Delivery", enabled: true },
        { text: "Separate Wash", enabled: true },
        { text: "Ironing Options", enabled: true },
        { text: "Fabric Softener Option", enabled: true },
        { text: "Special Items", enabled: false },
        { text: "Live Order Tracking", enabled: false },
        { text: "Priority Handling", enabled: false },
      ],
    },
    {
      id: "2",
      name: "Standard",
      price: "₹45",
      unit: "/per 5kg",
      deliveryTime: "Next day",
      features: [
        { text: "Free Pickup & Delivery", enabled: true },
        { text: "Separate Wash", enabled: true },
        { text: "Ironing Options", enabled: true },
        { text: "Fabric Softener Option", enabled: true },
        { text: "Special Items", enabled: true },
        { text: "Live Order Tracking", enabled: true },
        { text: "Priority Handling", enabled: true },
      ],
    },
  ]);

  const handleFeatureToggle = (planId: string, featureIndex: number) => {
    setPricingPlans(
      pricingPlans.map((plan) => {
        if (plan.id === planId) {
          const newFeatures = [...plan.features];
          newFeatures[featureIndex].enabled = !newFeatures[featureIndex].enabled;
          return { ...plan, features: newFeatures };
        }
        return plan;
      })
    );
  };

  const handleAddFeature = (planId: string, featureText: string) => {
    if (!featureText.trim()) return;
    setPricingPlans(
      pricingPlans.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            features: [...plan.features, { text: featureText, enabled: true }],
          };
        }
        return plan;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Hero Section</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Main banner section at the top of your landing page
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta">Call to Action Button Text</Label>
            <Input
              id="cta"
              value={heroCTA}
              onChange={(e) => setHeroCTA(e.target.value)}
              className="bg-muted/50"
            />
          </div>

          <Button className="mt-4">Save Hero Section</Button>
        </div>
      </Card>

      {/* Pricing Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Pricing Section</h2>
            <p className="text-sm text-muted-foreground">
              Manage pricing tiers displayed on your landing page
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Label>Plan Name</Label>
                    <Input
                      value={plan.name}
                      onChange={(e) => {
                        setPricingPlans(
                          pricingPlans.map((p) =>
                            p.id === plan.id ? { ...p, name: e.target.value } : p
                          )
                        );
                      }}
                      className="bg-muted/50"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive mt-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      value={plan.price}
                      onChange={(e) => {
                        setPricingPlans(
                          pricingPlans.map((p) =>
                            p.id === plan.id ? { ...p, price: e.target.value } : p
                          )
                        );
                      }}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Input
                      value={plan.unit}
                      onChange={(e) => {
                        setPricingPlans(
                          pricingPlans.map((p) =>
                            p.id === plan.id ? { ...p, unit: e.target.value } : p
                          )
                        );
                      }}
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Time</Label>
                  <Input
                    value={plan.deliveryTime}
                    onChange={(e) => {
                      setPricingPlans(
                        pricingPlans.map((p) =>
                          p.id === plan.id ? { ...p, deliveryTime: e.target.value } : p
                        )
                      );
                    }}
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Features</Label>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 group">
                      <div className="flex items-center gap-2 flex-1">
                        <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => handleFeatureToggle(plan.id, index)}
                        />
                        <span className={feature.enabled ? "text-foreground" : "text-muted-foreground"}>
                          {feature.text}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground mt-2"
                    onClick={() => {
                      const featureText = prompt("Enter feature name:");
                      if (featureText) handleAddFeature(plan.id, featureText);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add new feature
                  </Button>
                </div>

                <Button className="w-full">Save Pricing Section</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
