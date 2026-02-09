"use client";

import React from "react";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className="mb-6 text-sm text-[#0000008C] dark:text-[#FFFFFF8C]">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-1">{" > "}</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-black dark:text-white">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-customRed text-[#0000008C] dark:text-[#FFFFFF8C]"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

