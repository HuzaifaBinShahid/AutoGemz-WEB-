import { NAV_ITEMS } from "@/constants/constants";

// Type definitions for navigation items
type NavigationItem = 
  | { label: string; href: string }
  | { label: string; href: string; dropdown: { label: string; href: string }[] };

// Convert NAV_ITEMS to NAVIGATION_ITEMS format (children -> dropdown)
export const NAVIGATION_ITEMS: NavigationItem[] = NAV_ITEMS.map((item) => {
  if ("children" in item && item.children) {
    return {
      label: item.label,
      href: item.href,
      dropdown: item.children,
    };
  }
  return {
    label: item.label,
    href: item.href,
  };
});

