import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@inverclick/inverclick-ui/breadcrumb";
import { Fragment } from "react";

import Link from "next/link";

export type BlogBreadcrumbItem = Readonly<{ label: string; href?: string }>;

export type BlogBreadcrumbProps = Readonly<{
  items: BlogBreadcrumbItem[];
}>;

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="hover:text-primary-600">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
