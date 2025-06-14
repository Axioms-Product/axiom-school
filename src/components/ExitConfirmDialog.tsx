
import { useEffect, useState } from 'react';
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
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[90vw] max-w-md mx-auto rounded-xl border-0 shadow-2xl bg-white/95 backdrop-blur-md">
        <AlertDialogHeader className="text-center space-y-3 pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <LogOut className="h-8 w-8 text-white" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-gray-900">
            Exit Axioms School?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-base leading-relaxed">
            Are you sure you want to exit the application? Any unsaved progress may be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex-col sm:flex-row gap-3 pt-4">
          <AlertDialogCancel className="w-full sm:w-auto order-2 sm:order-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 h-12 rounded-xl font-medium transition-all duration-200">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 h-12 rounded-xl font-medium shadow-lg transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Exit App
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
