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
        "hidden lg:block border-l border-rovida-soft-gray bg-white/80 backdrop-blur-xl p-4 lg:p-6 overflow-y-auto shadow-subtle",
        "lg:w-[300px] xl:w-[350px] flex-shrink-0",
        className
      )}
    >
      {children}
    </aside>
  );
};

export default RightPanel;