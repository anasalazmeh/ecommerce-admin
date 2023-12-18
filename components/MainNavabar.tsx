'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNavabar = ({className}:{className?:string}) => {
  const parmas = useParams();
  const pathName = usePathname();
  const routes: { href: string; label: string; active: boolean }[] = [
    {
      label: "Setting",
      href: `/${parmas.storeId}/setting`,
      active: pathName == `/${parmas.storeId}/setting`,
    },
    {
      label: "Overview",
      href: `/${parmas.storeId}/Overview`,
      active: pathName == `/${parmas.storeId}/Overview`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
      {routes.map((data) => (
        <Link
          href={data.href}
          key={data.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            data.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {data.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavabar;
