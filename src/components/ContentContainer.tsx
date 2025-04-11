import { ReactNode } from "react";

const ContentContainer = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`bg-white shadow-[2px_2px_0_0_#163300] rounded-[4px] px-4 py-4 border-2 border-black space-y-4 ${className}`}>
      {children}
    </div>
  );
};

export default ContentContainer;
