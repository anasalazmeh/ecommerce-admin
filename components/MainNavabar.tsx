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
      label: "Overview",
      href: `/${parmas.storeId}`,
      active: pathName == `/${parmas.storeId}/overview`,
    },
    {
      label: "Billboards",
      href: `/${parmas.storeId}/billboards`,
      active: pathName == `/${parmas.storeId}/billboards`,
    },
    {
      label: "Categories",
      href: `/${parmas.storeId}/categories`,
      active: pathName == `/${parmas.storeId}/categories`,
    },
    {
      label: "Sizes",
      href: `/${parmas.storeId}/sizes`,
      active: pathName == `/${parmas.storeId}/sizes`,
    },
    {
      label: "Colors",
      href: `/${parmas.storeId}/colors`,
      active: pathName == `/${parmas.storeId}/colors`,
    },
    {
      label: "Products",
      href: `/${parmas.storeId}/products`,
      active: pathName == `/${parmas.storeId}/products`,
    },
    {
      label: "Order",
      href: `/${parmas.storeId}/orders`,
      active: pathName == `/${parmas.storeId}/orders`,
    },
    {
      label: "Setting",
      href: `/${parmas.storeId}/setting`,
      active: pathName == `/${parmas.storeId}/setting`,
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
