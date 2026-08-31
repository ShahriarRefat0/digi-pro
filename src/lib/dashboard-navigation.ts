export interface DashboardNavItem {
  label: string;
  href: string;
  icon: "LayoutDashboard" | "Package" | "Plus" | "ExternalLink" | "Settings" | "Users";
  badge?: string;
  permission?: string;
}

export const MAIN_DASHBOARD_NAV: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    permission: "DASHBOARD_VIEW",
  },
  {
    label: "Manage Products",
    href: "/dashboard/products",
    icon: "Package",
    permission: "PRODUCT_READ",
  },
  {
    label: "Add Product",
    href: "/dashboard/products/new",
    icon: "Plus",
    permission: "PRODUCT_CREATE",
  },
];

export const BOTTOM_DASHBOARD_NAV: DashboardNavItem[] = [
  {
    label: "View Website",
    href: "/",
    icon: "ExternalLink",
  },
];
