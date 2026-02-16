import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: Props) {
  return (
    <div className={`pox-4 mx-auto w-full max-w-6xl sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
