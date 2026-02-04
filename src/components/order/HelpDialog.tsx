import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Shirt, DollarSign, HelpCircle as HelpIcon, MessageCircle, ExternalLink } from 'lucide-react';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpDialog = ({ open, onOpenChange }: HelpDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <DialogTitle className="text-lg font-semibold text-foreground">Help</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Shirt className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">HOW IT<br />WORKS</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">PRICING</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <HelpIcon className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">FAQ</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5" />
                <span>Help Chat</span>
              </div>
              <span className="bg-primary text-white px-2 py-1 rounded text-xs">LIVE</span>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-between border border-input text-foreground hover:bg-accent"
            >
              <div className="flex items-center space-x-3">
                <HelpIcon className="h-5 w-5" />
                <span>Visit Help Center</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};