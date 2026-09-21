import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Max-width page wrapper with the responsive side gutter. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-page px-(--page-px) ${className}`}>
      {children}
    </div>
  );
}
