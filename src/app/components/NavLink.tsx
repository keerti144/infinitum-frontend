import Link from "next/link";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({
  href,
  children,
  onClick,
  className = "",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-gray-300 transition-colors duration-300 hover:text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
