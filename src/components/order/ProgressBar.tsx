import { useOrder } from "@/contexts/OrderContext";

export const ProgressBar = () => {
  const { state } = useOrder();
  const progress = (state.currentStep / 8) * 100;

  return (
    <div className="px-6 py-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Step {state.currentStep} of 8</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="relative">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full ${
                step <= state.currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
