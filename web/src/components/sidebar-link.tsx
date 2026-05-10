"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({
  href,
  label,
  small,
}: {
  href: string;
  label: string;
  small?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`nav-link ${active ? "active" : ""}`}
      style={small ? { fontSize: "0.83rem", paddingLeft: "1.1rem" } : undefined}
    >
      {label}
    </Link>
  );
}
