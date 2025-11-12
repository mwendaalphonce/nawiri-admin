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
  Settings,
  Send,
  XCircle,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarSection {
  label?: string; // Made optional for sections without labels
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
  // Dashboard (no label)
  {
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
    ],
    isCollapsible: false,
  },

  // Customer Management
  {
    label: "CUSTOMER MANAGEMENT",
    items: [
      {
        title: "Customers",
        url: "/customers",
        icon: Users,
        children: [
          { title: "All Customers", url: "/customers/all", icon: Users },
          { title: "Active Customers", url: "/customers/active", icon: Users },
          { title: "Closed Customers", url: "/customers/closed", icon: XCircle },
          { title: "Disabled Customers", url: "/customers/disabled", icon: UserX },
          { title: "Add New Customer", url: "/customers/new", icon: UserPlus },
          { title: "Notifications", url: "/customers/notifications", icon: MailOpen },
          { title: "Send Email to all", url: "/customers/broadcast", icon: Send },
        ],
      },
      {
        title: "KYC Management",
        url: "/kyc-management",
        icon: ShieldCheck,
        children: [
          { title: "Pending KYC", url: "/customers/pendingKyc", icon: Users },
          { title: "Rejected KYC", url: "/customers/rejectedKyc", icon: UserX },
          { title: "All KYC Logs", url: "/customers/allKycLogs", icon: FileText },
          { title: "KYC Options", url: "/customers/kycOptions", icon: Settings },
        ],
      },
    ],
    isCollapsible: true,
  },

  // Access Management
  {
    label: "ACCESS MANAGEMENT",
    items: [
      {
        title: "System Access",
        url: "/system-access",
        icon: Shield,
        children: [
          { title: "Manage Roles", url: "/roles", icon: Users },
          { title: "Manage Staff", url: "/staff", icon: UserX },
        ],
      },
    ],
    isCollapsible: true,
  },

  // Transactions
  {
    label: "TRANSACTIONS",
    items: [
      { title: "Transactions", url: "/transactions", icon: FileText },
      { title: "Wallets", url: "/wallets", icon: Wallet },
      { title: "Virtual Cards", url: "/virtual-cards", icon: CreditCard },
      { 
        title: "Profits", 
        url: "/profits", 
        icon: DollarSign,
      },
      {
        title: "Fund Transfer",
        url: "/fund-transfer",
        icon: Send,
        children: [
          { title: "Pending Transfers", url: "/fund-transfer/pending", icon: ScrollText },
          { title: "Rejected Transfers", url: "/fund-transfer/rejected", icon: XCircle },
          { title: " all Transfers", url: "/fund-transfer/all", icon: XCircle },
          { title: "Own Bank Transfers", url: "/fund-transfer/ownBank", icon: XCircle },
          { title: "Other Bank Transfer", url: "/fund-transfer/otherBank", icon: XCircle },
          { title: "Wire Transfer", url: "/fund-transfer/wireTranfer", icon: XCircle },
          { title: "Others Bank", url: "/fund-transfer/othersBank", icon: XCircle },
        ],
      },
      { title: "DPS",
        url: "/dps",
        icon: Landmark,
        badge: sidebarStats.totalDPS,
          children: [
          { title: "Ongoing DPS", url: "/dps/ongoing", icon: ScrollText },
          { title: "Payable DpS", url: "/dps/", icon: XCircle },
          { title: " Payable DPS", url: "/dps/", icon: XCircle },
          { title: "Completed DPS", url: "/dps/", icon: XCircle },
          { title: "Closed DPS ", url: "/dps/", icon: XCircle },
          { title: "All DPS ", url: "/dps/all", icon: XCircle },
          { title: "DPS Plans", url: "/dps/plans", icon: XCircle },
        ],
    
    },
        { title: "FDR", url: "/fdr", icon: HandCoins, badge: sidebarStats.totalFDR,
            children: [
            { title: "Ongoing FDR", url: "/fdr/ongoing", icon: ScrollText },
            { title: "Matured FDR", url: "/fdr/matured", icon: XCircle },
            { title: "Closed FDR", url: "/fdr/closed", icon: XCircle },
            { title: "All FDR", url: "/fdr/all", icon: XCircle },
            { title: "FDR Plans", url: "/fdr/plans", icon: XCircle },
            ]
         },     
        { title: "Loan", url: "/loan", icon: ScrollText, badge: sidebarStats.totalLoan ,
            children: [
            { title: "Pending Loans", url: "/loan/pending", icon: ScrollText },
            { title: "Active Loans", url: "/loan/active", icon: XCircle },
            { title: "Completed Loans", url: "/loan/completed", icon: XCircle },
            { title: "Defaulted Loans", url: "/loan/defaulted", icon: XCircle },
            { title: "All Loans", url: "/loan/all", icon: XCircle },
            { title: "Loan Plans", url: "/loan/plans", icon: XCircle },
            ]       
            },  
            

    ],
    isCollapsible: true,
  },

  // Bill Management
  {
    label: "BILL MANAGEMENT",
    items: [
      { title: "Bill Management", url: "/bill-management", icon: FileText },
      { title: "Bill History", url: "/bill-history", icon: History },
    ],
    isCollapsible: true,
  },

  // Essentials
  {
    label: "ESSENTIALS",
    items: [
      { 
        title: "Automatic Gateways", 
        url: "/automatic-gateways", 
        icon: Zap, 
        badge: sidebarStats.totalAutomaticGateways 
      },
      { 
        title: "Deposits", 
        url: "/deposits", 
        icon: Download, 
        badge: sidebarStats.totalDeposits 
      },
      { 
        title: "Withdraw", 
        url: "/withdraw", 
        icon: Upload, 
        badge: sidebarStats.totalWithdraw 
      },
      { 
        title: "Referral", 
        url: "/referral", 
        icon: Share2, 
        badge: sidebarStats.totalReferral 
      },
      { title: "Portfolios", url: "/portfolios", icon: FolderOpen },
      { 
        title: "Manage Reward Point", 
        url: "/manage-reward-point", 
        icon: Gift, 
        badge: sidebarStats.totalRewardPoints 
      },
    ],
    isCollapsible: true,
  },

  // Site Settings
  {
    label: "SITE SETTINGS",
    items: [{ title: "Settings", url: "/settings", icon: SettingsIcon }],
    isCollapsible: true,
  },

  // App Settings
  {
    label: "APP SETTINGS",
    items: [{ title: "App Settings", url: "/app-settings", icon: SettingsIcon }],
    isCollapsible: true,
  },

  // Appearance & Pages
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

  // Support & Newsletter
  {
    label: "SUPPORT & NEWSLETTER",
    items: [
      { title: "Templates", url: "/templates", icon: Mail },
      { title: "Subscriber & Support", url: "/subscriber-support", icon: Headset },
    ],
    isCollapsible: true,
  },

  // System
  {
    label: "SYSTEM",
    items: [{ title: "System", url: "/system", icon: Server }],
    isCollapsible: true,
  },
];