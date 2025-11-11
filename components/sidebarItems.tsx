// sidebarItems.ts
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Shield,
  FileText,
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  Landmark,
  HandCoins,
  ScrollText,
  History,
  Zap,
  Download,
  Upload,
  Share2,
  FolderOpen,
  Gift,
  Settings as SettingsIcon,
  Palette,
  Layout,
  File,
  Menu,
  Mail,
  Headset,
  Server,
  UserPlus,
  UserX,
  MailOpen,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarSection {
  label: string;
  items: SidebarItem[];
  isCollapsible: boolean;
}

export const sidebarStats = {
  totalUsers: 14,
  totalDeposits: "KES0",
  totalWithdraw: "KES0",
  totalReferral: "KES1150",
  totalFundTransfer: "KES0",
  totalDPS: "KES0",
  totalFDR: "KES0",
  totalLoan: "KES0",
  totalAutomaticGateways: 0,
  totalRewardPoints: "KES0",
};

export const sidebarSections: SidebarSection[] = [
  // 1. Dashboard
  {
    label: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
    ],
    isCollapsible: false,
  },

  // 2. Customer Management
  {
    label: "CUSTOMER MANAGEMENT",
    items: [
      {
        title: "Customers",
        url: "/customers",
        icon: Users,
        badge: sidebarStats.totalUsers,
        children: [
          { title: "All Customers", url: "/customers/all", icon: Users },
          { title: "Active Customers", url: "/customers/active", icon: Users },
          { title: "Closed Customers", url: "/customers/closed", icon: UserX },
          { title: "Disabled Customers", url: "/customers/disabled", icon: UserX },
          { title: "Add New Customer", url: "/customers/new", icon: UserPlus },
          { title: "Notifications", url: "/customers/notifications", icon: MailOpen },
          { title: "Send Email to all", url: "/customers/broadcast", icon: MailOpen },
        ],
      },
      {
        title: "KYC Management",
        url: "/kyc-management",
        icon: ShieldCheck,
      },
    ],
    isCollapsible: true,
  },

  // 3. Access Management
  {
    label: "ACCESS MANAGEMENT",
    items: [
      {
        title: "System Access",
        url: "/system-access",
        icon: Shield,
      },
    ],
    isCollapsible: true,
  },

  // 4. Transactions
  {
    label: "TRANSACTIONS",
    items: [
      { title: "Transactions", url: "/transactions", icon: FileText },
      { title: "Wallets", url: "/wallets", icon: Wallet },
      { title: "Virtual Cards", url: "/virtual-cards", icon: CreditCard },
      { title: "Profits", url: "/profits", icon: DollarSign },
      { title: "Fund Transfer", url: "/fund-transfer", icon: TrendingUp, badge: sidebarStats.totalFundTransfer },
      { title: "DPS", url: "/dps", icon: Landmark, badge: sidebarStats.totalDPS },
      { title: "FDR", url: "/fdr", icon: HandCoins, badge: sidebarStats.totalFDR },
      { title: "Loan", url: "/loan", icon: ScrollText, badge: sidebarStats.totalLoan },
    ],
    isCollapsible: true,
  },

  // 5. Bill Management
  {
    label: "BILL MANAGEMENT",
    items: [
      { title: "Bill Management", url: "/bill-management", icon: FileText },
      { title: "Bill History", url: "/bill-history", icon: History },
    ],
    isCollapsible: true,
  },

  // 6. Essentials
  {
    label: "ESSENTIALS",
    items: [
      { title: "Automatic Gateways", url: "/automatic-gateways", icon: Zap, badge: sidebarStats.totalAutomaticGateways },
      { title: "Deposits", url: "/deposits", icon: Download, badge: sidebarStats.totalDeposits },
      { title: "Withdraw", url: "/withdraw", icon: Upload, badge: sidebarStats.totalWithdraw },
      { title: "Referral", url: "/referral", icon: Share2, badge: sidebarStats.totalReferral },
      { title: "Portfolios", url: "/portfolios", icon: FolderOpen },
      { title: "Manage Reward Point", url: "/manage-reward-point", icon: Gift, badge: sidebarStats.totalRewardPoints },
    ],
    isCollapsible: true,
  },

  // 7. Site Settings
  {
    label: "SITE SETTINGS",
    items: [{ title: "Settings", url: "/settings", icon: SettingsIcon }],
    isCollapsible: true,
  },

  // 8. App Settings
  {
    label: "APP SETTINGS",
    items: [{ title: "App Settings", url: "/app-settings", icon: SettingsIcon }],
    isCollapsible: true,
  },

  // 9. Appearance & Pages
  {
    label: "APPEARANCE & PAGES",
    items: [
      { title: "Appearance", url: "/appearance", icon: Palette },
      { title: "Landing Page", url: "/landing-page", icon: Layout },
      { title: "Pages", url: "/pages", icon: File },
      { title: "Site Navigations", url: "/site-navigations", icon: Menu },
    ],
    isCollapsible: true,
  },

  // 10. Support & Newsletter
  {
    label: "SUPPORT & NEWSLETTER",
    items: [
      { title: "Templates", url: "/templates", icon: Mail },
      { title: "Subscriber & Support", url: "/subscriber-support", icon: Headset },
    ],
    isCollapsible: true,
  },

  // 11. System
  {
    label: "SYSTEM",
    items: [{ title: "System", url: "/system", icon: Server }],
    isCollapsible: true,
  },
];