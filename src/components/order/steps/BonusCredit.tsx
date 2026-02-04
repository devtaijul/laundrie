import React from "react";

export const BonusCredit = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-3 flex items-center space-x-3">
      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
        <span className="text-white text-xs">€</span>
      </div>
      <div>
        <p className="font-medium text-primary">€10 Bonus Credits</p>
        <p className="text-xs text-muted-foreground">Expires in 06:28</p>
      </div>
    </div>
  );
};
