import React from 'react';
import { cn } from '@/lib/utils';

interface RightPanelProps {
  children: React.ReactNode;
  className?: string;
}

const RightPanel = ({ children, className }: RightPanelProps) => {
  return (
    <aside
      className={cn(
        "hidden lg:block border-l bg-muted/40 p-4 lg:p-6 overflow-y-auto",
        "lg:w-[300px] xl:w-[350px] flex-shrink-0",
        className
      )}
    >
      {children}
    </aside>
  );
};

export default RightPanel;