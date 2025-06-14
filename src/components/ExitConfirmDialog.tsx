
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LogOut, X } from 'lucide-react';

interface ExitConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ExitConfirmDialog = ({ open, onOpenChange, onConfirm }: ExitConfirmDialogProps) => {
  const handleCancel = () => {
    console.log('Cancel button clicked');
    onOpenChange(false);
  };

  const handleConfirm = () => {
    console.log('Confirm exit button clicked');
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[95vw] max-w-sm mx-auto rounded-2xl border-0 shadow-2xl bg-white/98 backdrop-blur-lg dark:bg-gray-900/98">
        <AlertDialogHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <LogOut className="h-8 w-8 text-white" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            Exit Axioms School?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed px-2">
            Are you sure you want to exit the application? Any unsaved progress may be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex flex-col gap-3 pt-6">
          <AlertDialogAction 
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 h-12 rounded-xl font-medium shadow-lg transition-all duration-200 order-1"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Exit App
          </AlertDialogAction>
          <AlertDialogCancel 
            onClick={handleCancel}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border-0 h-12 rounded-xl font-medium transition-all duration-200 order-2"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
